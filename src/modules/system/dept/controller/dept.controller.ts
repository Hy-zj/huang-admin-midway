/*
 * @Description:  部门路由
 * @Author: huangyue
 * @LastEditors: huangyue
 * @LastEditTime: 2023-03-27 11:26:30
 */
import { Query, Controller, Get, Inject } from "@midwayjs/core";
import { Context } from "@midwayjs/koa";
import { Result } from '../../../../common/result';
import { DeptService } from "../service/dept.service";
import { Dept } from '../model/dept.model';
import { PreAuthorize } from '../../../../decorator/PreAuthorizeDecorator';

@Controller('/system/dept')
export class DeptController {
    @Inject()
    ctx: Context

    @Inject()
    deptService: DeptService

    @Get('/list')
    @PreAuthorize()
    async list(@Query() dept: Dept): Promise<Result> {
        let res = await this.deptService.selectDeptList(dept)
        return Result.okData(res)
    }
}