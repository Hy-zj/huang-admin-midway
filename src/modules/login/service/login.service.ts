/*
 * @Description: 登陆业务层
 * @Author: huangyue
 * @LastEditors: huangyue
 * @LastEditTime: 2023-03-24 15:20:05
 */
import { Inject, Provide } from '@midwayjs/core';
import { LoginBody } from '../model/login.body';
import { CAPTCHA_CODE_KEY } from '../../../constants/captcha';
import { RedisCache } from '../../../source/redis';
import { Context } from '@midwayjs/koa';
import { SysUserService } from '../../system/user/service/user.service';
import { LoginUser } from '../model/login.user';
import { UserStatus } from '../../../enum/user';
import { ContextService } from '../../common/service/context.service';
import { PWD_ERR_CNT_KEY } from '../../../constants/cache'
import { parseNumber } from '../../../utils/ParseUtils';
import { bcryptCompare } from '../../../utils/CryptoUtils';
import { TokenService } from '../../token/service/token.service';

@Provide()
export class LoginService {

    @Inject()
    ctx: Context

    @Inject()
    contextService: ContextService


    @Inject()
    redisCache: RedisCache

    @Inject()
    sysUserService: SysUserService

    @Inject()
    tokenService: TokenService
    /**
   * 登录生成token
   * @param loginBody 登录参数信息
   * @returns 生成的token
   */
    public async login(loginBody: LoginBody): Promise<string> {
        //第一步解析loginBody
        const { username, password, uuid, code } = loginBody
        //第二步验证验证码
        await this.validateCaptcha(code, uuid)
        //第三步 验证用户名和密码获取登陆用户
        const loginUser = await this.loadUserByUsername(
            username,
            password
        );
        //第四步 获取token
        return await this.tokenService.createToken(loginUser)
    }

    /**
       * 校验验证码
       * @param code 验证码
       * @param uuid 唯一标识
       * @return 结果
       */
    private async validateCaptcha(code: string, uuid: string) {
        //获取定义的key
        const verifyKey = CAPTCHA_CODE_KEY + uuid;
        //通过redis获取验证码code
        const captcha = await this.redisCache.get(verifyKey);
        //清除
        await this.redisCache.del(verifyKey);
        if (!captcha) {
            // 记录登录信息
            this.ctx.logger.info('验证码失效 %s', code);
            // 验证码失效
            throw new Error('验证码失效');
        }

        if (code !== captcha) {
            // 记录登录信息
            this.ctx.logger.info('验证码错误 %s', code);
            // 验证码错误
            throw new Error('验证码错误');
        }
    }


    /**
  * 用户验证处理
  * @param username 登录用户名
  * @param password 登录密码
  * @returns 登录用户信息
  */
    private async loadUserByUsername(
        username: string,
        password: string
    ): Promise<LoginUser> {
        //获取系统用户
        const sysUser = await this.sysUserService.selectUserByUserName(username)
        if (!sysUser) {
            this.ctx.logger.info('登录用户：%s 不存在.', username);
            throw new Error(`登录用户${username}不存在`);
        }
        if (sysUser.delFlag === UserStatus.DELETED) {
            this.ctx.logger.info('登录用户：%s 已被删除.', username);
            throw new Error(`登录用户${username}已被删除`);
        }
        if (sysUser.status === UserStatus.DISABLE) {
            this.ctx.logger.info('登录用户：%s 已被停用.', username);
            throw new Error(`登录用户${username}已被停用`);
        }
        await this.validatePassword(sysUser.userName, sysUser.password, password)
        // 获取权限列表
        const permissions = []
        return await this.tokenService.createLoginUser(sysUser, permissions);
    }
    /**
 * 验证登录次数和密码校验
 * @param loginName 用户名
 * @param hashPassword 加密密码
 * @param originPassword 原始密码
 */
    private async validatePassword(
        loginName: string,
        hashPassword: string,
        originPassword: string
    ): Promise<void> {
        // 从本地配置获取user信息
        const userConfig = this.contextService.getConfig('user');
        const { maxRetryCount, lockTime } = userConfig.password;
        // 验证缓存记录次数
        const cacheKey = PWD_ERR_CNT_KEY + loginName;
        let retryCount = await this.redisCache.get(cacheKey);
        if (retryCount === null) {
            retryCount = '0';
        }
        // 是否超过错误值
        if (parseNumber(retryCount) >= parseNumber(maxRetryCount)) {
            this.ctx.logger.info(
                '密码输入错误 %s 次，帐户锁定 %s 分钟',
                maxRetryCount,
                lockTime
            );
            throw new Error(`密码输入错误${maxRetryCount}次，帐户锁定${lockTime}分钟`);
        }
        // 匹配用户密码，清除错误记录次数
        const compareBool = await bcryptCompare(originPassword, hashPassword);
        if (compareBool) {
            this.clearLoginRecordCache(loginName);
        } else {
            retryCount = `${parseNumber(retryCount) + 1}`;
            this.ctx.logger.info('密码输入错误 %s 次', retryCount);
            throw new Error(`密码输入错误${retryCount}次`);
        }

    }

    /**
   * 清楚登录错误次数
   * @param loginName 登录用户名
   */
    public async clearLoginRecordCache(loginName: string): Promise<void> {
        const cacheKey = PWD_ERR_CNT_KEY + loginName;
        const hasBool = await this.redisCache.hasKey(cacheKey);
        if (hasBool) {
            await this.redisCache.del(cacheKey);
        }
    }

    /**
* 登出清除token
*/
    public async logout(token: string): Promise<void> {
        return await this.tokenService.delLoginUserCache(token);
    }
}

