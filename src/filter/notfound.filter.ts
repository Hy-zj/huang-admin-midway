/*
 * @Description: 
 * @Author: huangyue
 * @LastEditors: huangyue
 * @LastEditTime: 2023-03-23 16:31:54
 */
import { Catch, httpError, HttpStatus, MidwayHttpError } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { Result } from '../common/result';

@Catch(httpError.NotFoundError)
export class NotFoundFilter {
  async catch(err: MidwayHttpError, ctx: Context) {
    // 404 错误会到这里
    // 所有的未分类错误会到这里
    ctx.logger.error('%s => %s > %s', ctx.path, err.name, err.message);
    // 返回200，提示错误信息
    ctx.body = Result.errMsg(err.message, 404);
    ctx.status = HttpStatus.OK
  }
}
