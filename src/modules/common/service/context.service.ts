import { Inject, Provide } from '@midwayjs/core';
import { ContextInterface } from '../interface/context.interface';
import { Context } from '@midwayjs/koa';
import { SysUser } from '../../system/user/model/user.model';
import { UnauthorizedError } from '@midwayjs/core/dist/error/http';
import { LoginUser } from '../../login/model/login.user';
/*
 * @Description: 上下文服务层
 * @Author: huangyue
 * @LastEditors: huangyue
 * @LastEditTime: 2023-03-24 15:18:25
 */

@Provide()
export class ContextService implements ContextInterface {

    @Inject()
    ctx: Context

    getContext(): Context {
        return this.ctx
    }
    getConfig(key: string): any {
        try {
            return this.ctx.app.getConfig(key);
        } catch (e) {
            throw new Error(`获取配置信息异常, ${e.message}.`)
        }
    }

    /**
 * 获取登录用户详细信息
 **/
    getSysUser(): SysUser {
        try {
            let user = this.ctx.loginUser.user;
            delete user.password;
            return user;
        } catch (e) {
            throw new UnauthorizedError(`获取登录用户详细信息异常, ${e.message}.`);
        }
    }



    /**
     * 获取登录用户
     **/
    getLoginUser(): LoginUser {
        try {
            return this.ctx.loginUser;
        } catch (e) {
            throw new UnauthorizedError(`获取登录用户信息异常, ${e.message}.`);
        }
    }

}