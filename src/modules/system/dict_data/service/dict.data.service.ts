/*
 * @Description:  
 * @Author: huangyue
 * @LastEditors: huangyue
 * @LastEditTime: 2023-03-27 14:59:58
 */
import { Inject, Provide } from '@midwayjs/core';
import { IDictData } from '../interface/dict.data.interface';
import { DictData } from '../model/dict.model';
import { MysqlManager } from '../../../../source/mysql';

const SYS_DICT_DATA_VO = `select d.dict_code,d.dict_sort,d.dict_label,d.dict_value,d.dict_type,
d.css_class,d.list_class,d.is_default,d.status,d.create_by,d.create_time,d.update_by,d.update_time,d.remark from sys_dict_data d
`

const SYS_DICT_DATA_RESULT = new Map<string, string>()
SYS_DICT_DATA_RESULT.set('dict_code', 'dictCode')
SYS_DICT_DATA_RESULT.set('dict_sort', 'dictSort')
SYS_DICT_DATA_RESULT.set('dict_label', 'dictLabel')
SYS_DICT_DATA_RESULT.set('dict_value', 'dictValue')
SYS_DICT_DATA_RESULT.set('dict_type', 'dictType')
SYS_DICT_DATA_RESULT.set('css_class', 'cssClass')
SYS_DICT_DATA_RESULT.set('list_class', 'listClass')
SYS_DICT_DATA_RESULT.set('is_default', 'isDefault')
SYS_DICT_DATA_RESULT.set('status', 'status');
SYS_DICT_DATA_RESULT.set('create_by', 'createBy');
SYS_DICT_DATA_RESULT.set('create_time', 'createTime');
SYS_DICT_DATA_RESULT.set('update_by', 'updateBy');
SYS_DICT_DATA_RESULT.set('update_time', 'updateTime');
SYS_DICT_DATA_RESULT.set('remark', 'remark');

/**
 *将结果记录转实体结果组
 * @param rows 查询结果记录
 * @returns 实体组
 */
function parseSysDictDataResult(rows: DictData[]): DictData[] {
    let sysDictDatas: DictData[] = []
    rows.forEach(row => {
        let sysDictData = new DictData()
        for (const key in row) {
            if (SYS_DICT_DATA_RESULT.has(key)) {
                let keyMapper = SYS_DICT_DATA_RESULT.get(key)
                sysDictData[keyMapper] = row[key]
            }
        }
        sysDictDatas.push(sysDictData)
    })
    return sysDictDatas
}

@Provide()
export class DictDataService implements IDictData {
    @Inject()
    db: MysqlManager

    async selectDicDataList(dictData: DictData): Promise<DictData[]> {
        let sqlStr = `${SYS_DICT_DATA_VO} where 1 = 1`
        let paramArr = []
        //根据dictType查询
        if (dictData?.dictType) {
            sqlStr += ` and d.dict_type = ? `
            paramArr.push(dictData.dictType)
        }
        sqlStr += ` order by d.dict_sort asc `
        const rows = await this.db.execute(sqlStr, paramArr)

        return parseSysDictDataResult(rows)
    }

}