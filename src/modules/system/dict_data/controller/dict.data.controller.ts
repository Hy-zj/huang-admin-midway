/*
 * @Description: 字典数据
 * @Author: huangyue
 * @LastEditors: huangyue
 * @LastEditTime: 2023-03-27 14:37:20
 */

import { Controller, Get, Inject, Query } from "@midwayjs/core";
import { Context } from '@midwayjs/koa';
import { DictData } from '../model/dict.model';
import { DictDataService } from '../service/dict.data.service';
import { Result } from '../../../../common/result';

@Controller('/system/dict/data')
export class DictDataController {
    @Inject()
    ctx: Context

    @Inject()
    dictDataService: DictDataService

    @Get('/list')
    async list(@Query() dictData: DictData): Promise<Result> {
        const rows = await this.dictDataService.selectDicDataList(dictData)
        return Result.ok({
            rows
        })
    }

}