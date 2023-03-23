/*
 * @Description: 
 * @Author: huangyue
 * @LastEditors: huangyue
 * @LastEditTime: 2023-03-23 17:14:33
 */
import { Controller, Get, Inject } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { Result } from './common/result';
import { ContextService } from './modules/common/service/context.service';



@Controller('/')
export class HomeController {
  @Inject()
  ctx: Context

  @Inject()
  contextService: ContextService

  @Get('/')
  async home(): Promise<void> {

    const { version, name } = this.contextService.getConfig('project')

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
