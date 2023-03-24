/*
 * @Description: 
 * @Author: huangyue
 * @LastEditors: huangyue
 * @LastEditTime: 2023-03-24 11:04:46
 */
import { Catch, httpError, MidwayHttpError } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { Result } from '../common/result';

@Catch(httpError.UnauthorizedError)
export class UnauthorizedFilter {
    async catch(err: MidwayHttpError, ctx: Context) {
        // 404 错误会到这里
        // 所有的未分类错误会到这里
        ctx.logger.error('%s => %s > %s', ctx.path, err.name, err.message);
        return Result.errMsg(err.message, 401);
    }
}
