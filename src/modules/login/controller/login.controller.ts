/*
 * @Description: 登陆相关路由
 * @Author: huangyue
 * @LastEditors: huangyue
 * @LastEditTime: 2023-03-23 17:49:33
 */

import { Body, Controller, Inject, Post } from "@midwayjs/core";
import { Context } from "@midwayjs/koa";
import { LoginBody } from "../model/login.body";

@Controller()
export class LoginController {
    @Inject()
    ctx: Context

    @Post('login')
    async login(@Body() loginBody: LoginBody) {
        //返回token
    }
}