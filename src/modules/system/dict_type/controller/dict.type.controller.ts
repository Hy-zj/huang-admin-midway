/*
 * @Description:  部门路由
 * @Author: huangyue
 * @LastEditors: huangyue
 * @LastEditTime: 2023-03-27 12:00:53
 */
import { Query, Controller, Get, Inject } from "@midwayjs/core";
import { Context } from "@midwayjs/koa";
import { Result } from '../../../../common/result';
import { DeptService } from "../service/dict.type.service";
import { DictType } from '../model/dict.type.model';

@Controller('/system/dict/type')
export class DeptController {
    @Inject()
    ctx: Context

    @Inject()
    deptService: DeptService

    @Get('/list')
    async list(@Query() dept: DictType): Promise<Result> {
        let rows = await this.deptService.selectDictTypeList(dept)
        return Result.ok({
            rows
        })
    }
}