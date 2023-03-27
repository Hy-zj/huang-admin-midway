/*
 * @Description: 
 * @Author: huangyue
 * @LastEditors: huangyue
 * @LastEditTime: 2023-03-27 14:23:32
 */
import { DictData } from "../model/dict.model";

export interface IDictData {
    /**
   * 根据条件查询字典数据
   *
   * @param dictData 字典数据信息
   * @return 字典数据集合信息
   */
    selectDicDataList(dictData: DictData): Promise<DictData[]>
}