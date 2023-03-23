/*
 * @Description: 
 * @Author: huangyue
 * @LastEditors: huangyue
 * @LastEditTime: 2023-03-23 16:19:10
 */
import { Controller, Get, Inject } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { Result } from './common/result';



@Controller('/')
export class HomeController {
  @Inject()
  ctx: Context


  @Get('/')
  async home(): Promise<void> {
    const { version, name } = this.ctx.app.getConfig('project')
    await this.ctx.render('home', {
      text: `欢迎使用${name}后台管理框架，当前版本：v${version}！！！`
    })
  }

  @Get('/test')
  async test(): Promise<Result> {
    return Result.ok({
      test: 1
    })
  }
}
