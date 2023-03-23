/*
 * @Description: 上下文对象接口
 * @Author: huangyue
 * @LastEditors: huangyue
 * @LastEditTime: 2023-03-23 17:07:19
 */

import { Context } from "@midwayjs/koa";


export interface ContextInterface {

    //获取上下文
    getContext: () => Context

    // 获取配置信息
    getConfig: (key: string) => string


}