import { Inject, Provide } from '@midwayjs/core';
import { ContextInterface } from '../interface/context.interface';
import { Context } from '@midwayjs/koa';
/*
 * @Description: 上下文服务层
 * @Author: huangyue
 * @LastEditors: huangyue
 * @LastEditTime: 2023-03-23 17:14:13
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
}