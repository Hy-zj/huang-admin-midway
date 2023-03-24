/*
 * @Description: 装饰器
 * @Author: huangyue
 * @LastEditors: huangyue
 * @LastEditTime: 2023-03-24 14:52:33
 */
import { Context, JoinPoint, REQUEST_OBJ_CTX_KEY, createCustomMethodDecorator } from '@midwayjs/core';
import { TokenService } from '../modules/token/service/token.service';
import { LoginUser } from '../modules/login/model/login.user';
import { UnauthorizedError } from '@midwayjs/core/dist/error/http';

interface AuthOptions {
    /**只需含有其中角色 */
    hasRoles?: string[];
    /**只需含有其中权限 */
    hasPermissions?: string[];
    /**同时匹配其中角色 */
    matchRoles?: string[];
    /**同时匹配其中权限 */
    matchPermissions?: string[];
}


/**装饰器内部的唯一 key */
export const DECORATOR_AUTH_TOKEN_KEY = 'decorator:auth_token_key';

export function PreAuthorize(options?: AuthOptions): MethodDecorator {
    // 我们传递了一个可以修改展示格式的参数
    return createCustomMethodDecorator(DECORATOR_AUTH_TOKEN_KEY, { options });
}

/**
 * 实现装饰器授权认证
 * @param options.metadata 方法装饰器参数
 * @returns 返回结果
 */
export function PreAuthorizeVerify(options: { metadata: AuthOptions }) {
    return {
        around: async (joinPoint: JoinPoint) => {
            // 装饰器所在的实例上下文
            const ctx: Context = joinPoint.target[REQUEST_OBJ_CTX_KEY];
            // 获取用户信息
            const tokenService: TokenService = await ctx.requestContext.getAsync(
                TokenService
            );
            let loginUser: LoginUser = await tokenService.getLoginUser();
            if (loginUser && loginUser.userId) {
                loginUser = await tokenService.verifyToken(loginUser);
                ctx.loginUser = loginUser;
            } else {
                throw new UnauthorizedError('无效授权');
            }

            // 登录用户角色权限校验


            // 返回 执行后续方法
            return await joinPoint.proceed(...joinPoint.args);
        }
    }
}