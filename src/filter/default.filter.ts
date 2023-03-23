/*
 * @Description: 默认错误拦截器
 * @Author: huangyue
 * @LastEditors: huangyue
 * @LastEditTime: 2023-03-23 16:31:49
 */
import { Catch, HttpStatus } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { Result } from '../common/result';


@Catch()
export class DefaultErrorFilter {
  async catch(err: Error, ctx: Context) {
    // 所有的未分类错误会到这里
    ctx.logger.error('%s => %s > %s', ctx.path, err.name, err.message);
    // 返回200，提示错误信息
    ctx.body = Result.errMsg(err.message);
    ctx.status = HttpStatus.OK;
  }
}
