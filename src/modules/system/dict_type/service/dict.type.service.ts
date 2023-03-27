/*
 * @Description: 部门业务层
 * @Author: huangyue
 * @LastEditors: huangyue
 * @LastEditTime: 2023-03-27 12:02:46
 */
import { Inject, Provide } from '@midwayjs/core';
import { IDictType } from '../interface/dict.type.interface';
import { DictType } from '../model/dict.type.model';
import { MysqlManager } from '../../../../source/mysql';

/**查询视图对象SQL */
const SELECT_DICT_TYPE_VO = `select d.dict_id,d.dict_name, d.dict_type,d.status,d.create_by,d.create_time,d.update_by,d.update_time,d.remark from sys_dict_type d`

/**部门信息实体映射 */
const SYS_DICT_TYPE_RESULT = new Map<string, string>();

SYS_DICT_TYPE_RESULT.set('dict_id', 'dictId');
SYS_DICT_TYPE_RESULT.set('dict_name', 'dictName');
SYS_DICT_TYPE_RESULT.set('dict_type', 'dictType');
SYS_DICT_TYPE_RESULT.set('status', 'status');
SYS_DICT_TYPE_RESULT.set('create_by', 'createBy');
SYS_DICT_TYPE_RESULT.set('create_time', 'createTime');
SYS_DICT_TYPE_RESULT.set('update_by', 'updateBy');
SYS_DICT_TYPE_RESULT.set('update_time', 'updateTime');
SYS_DICT_TYPE_RESULT.set('remark', 'remark');

/**
 *将结果记录转实体结果组
 * @param rows 查询结果记录
 * @returns 实体组
 */
function parseSysDictTypeResult(rows: DictType[]): DictType[] {
    let sysDictTypes: DictType[] = []
    rows.forEach(row => {
        let sysDictType = new DictType()
        for (const key in row) {
            if (SYS_DICT_TYPE_RESULT.has(key)) {
                const keyMapper = SYS_DICT_TYPE_RESULT.get(key);
                sysDictType[keyMapper] = row[key]
            }
        }
        sysDictTypes.push(sysDictType);
    })
    return sysDictTypes
}

@Provide()
export class DeptService implements IDictType {
    @Inject()
    db: MysqlManager

    async selectDictTypeList(dictType: DictType): Promise<DictType[]> {
        let sqlStr = `${SELECT_DICT_TYPE_VO}`
        let paramArr = []
        if (dictType?.dictId) {
            sqlStr += ' and dict_id = ? ';
            paramArr.push(dictType.dictId);
        }

        if (dictType?.dictName) {
            sqlStr += " and dict_name like concat('%', ?, '%') ";
            paramArr.push(dictType.dictName);
        }
        if (dictType?.dictType) {
            sqlStr += " and dict_type = ?";
            paramArr.push(dictType.dictType);
        }
        if (dictType?.status) {
            sqlStr += ' and status = ? ';
            paramArr.push(dictType.status);
        }

        const rows = await this.db.execute(sqlStr, paramArr)
        const sysDictTypes = parseSysDictTypeResult(rows)
        return sysDictTypes
    }
}