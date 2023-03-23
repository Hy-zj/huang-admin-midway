import { Inject, Provide } from "@midwayjs/core";
import { MysqlManager } from '../../../source/mysql';

/*
 * @Description: 
 * @Author: huangyue
 * @LastEditors: huangyue
 * @LastEditTime: 2023-03-23 17:52:40
 */

@Provide()
export class TokenService {
    @Inject()
    db: MysqlManager
}