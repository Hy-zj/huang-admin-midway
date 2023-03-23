/*
 * @Description: 系统用户业务层
 * @Author: huangyue
 * @LastEditors: huangyue
 * @LastEditTime: 2023-03-23 17:39:50
 */
import { Inject, Provide } from '@midwayjs/core';
import { SysUserInterface } from '../interface/user.interface';
import { MysqlManager } from '../../../../source/mysql'

@Provide()
export class SysUserService implements SysUserInterface {

    @Inject()
    private db: MysqlManager;


    async selectUserPage(query): Promise<rowPages> {
        console.log(this.db)
        const total = 0
        const rows = []
        return { total, rows }
    }
}