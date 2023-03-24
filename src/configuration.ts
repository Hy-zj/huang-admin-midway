/*
 * @Description: 应用配置
 * @Author: huangyue
 * @LastEditors: huangyue
 * @LastEditTime: 2023-03-24 14:42:34
 */
import { Configuration, App, MidwayDecoratorService, Inject } from '@midwayjs/core';
import * as koa from '@midwayjs/koa';
import * as validate from '@midwayjs/validate';
import * as info from '@midwayjs/info';
import { join } from 'path';
import { DefaultErrorFilter } from './filter/default.filter';
import { NotFoundFilter } from './filter/notfound.filter';
import { UnauthorizedFilter } from './filter/unauthorized.filter';
import { ReportMiddleware } from './middleware/report.middleware';
import { DECORATOR_AUTH_TOKEN_KEY, PreAuthorizeVerify } from './decorator/PreAuthorizeDecorator'
import * as view from '@midwayjs/view-ejs';
import * as staticFile from '@midwayjs/static-file';
import * as typeorm from '@midwayjs/typeorm';
import * as redis from '@midwayjs/redis';
import * as jwt from '@midwayjs/jwt';
@Configuration({
  imports: [
    koa,
    typeorm,
    redis,
    jwt,
    view,
    staticFile,
    validate,
    {
      component: info,
      enabledEnvironment: ['local'],
    },
  ],
  importConfigs: [join(__dirname, './config')],
})
export class ContainerLifeCycle {
  @App()
  app: koa.Application;

  @Inject()
  decoratorService: MidwayDecoratorService;

  async onReady() {
    // 添加中间件
    this.app.useMiddleware([ReportMiddleware]);
    // 添加过滤器
    this.app.useFilter([NotFoundFilter, UnauthorizedFilter, DefaultErrorFilter]);
    // 添加装饰器
    // 注册实现的方法装饰器-授权认证
    this.decoratorService.registerMethodHandler(DECORATOR_AUTH_TOKEN_KEY, PreAuthorizeVerify);
  }
}
