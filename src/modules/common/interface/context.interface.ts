/*
 * @Description: 上下文对象接口
 * @Author: huangyue
 * @LastEditors: huangyue
 * @LastEditTime: 2023-03-24 15:18:24
 */

import { Context } from "@midwayjs/koa";
import { LoginUser } from "../../login/model/login.user";


export interface ContextInterface {

    //获取上下文
    getContext: () => Context

    // 获取配置信息
    getConfig: (key: string) => string

    // 获取登陆用户信息
    getLoginUser: () => LoginUser
}