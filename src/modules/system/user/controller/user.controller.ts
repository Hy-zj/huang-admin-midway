/*
 * @Description:  
 * @Author: huangyue
 * @LastEditors: huangyue
 * @LastEditTime: 2023-03-23 17:32:12
 */
import { Controller, Get, Inject, Provide, Query } from "@midwayjs/core";
import { SysUserService } from '../service/user.service';
import { Result } from '../../../../common/result';


@Provide()
@Controller('/system/user')
export class SysUserController {
    @Inject()
    sysUserService: SysUserService

    @Get('/list')
    async getList(@Query() query): Promise<Result> {
        const { total, rows } = await this.sysUserService.selectUserPage(query)
        return Result.ok({
            total,
            rows
        })
    }
}