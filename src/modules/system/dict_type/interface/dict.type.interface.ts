import { DictType } from '../model/dict.type.model';
/*
 * @Description: 字典类型接口层
 * @Author: huangyue
 * @LastEditors: huangyue
 * @LastEditTime: 2023-03-27 11:47:59
 */


export interface IDictType {
    /**
 * 查询字典类型数据
 *
 * @param sysDept 字典类型信息
 * @return 字典类型集合
 */
    selectDictTypeList(sysDept: DictType): Promise<DictType[]>;

}