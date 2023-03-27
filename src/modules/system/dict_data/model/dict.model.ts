/*
 * @Description: 字典数据
 * @Author: huangyue
 * @LastEditors: huangyue
 * @LastEditTime: 2023-03-27 14:17:37
 */

export class DictData {
    //字典编码
    dictCode: number
    //字典排序
    dictSort: number
    //字典标签
    dictLabel: string
    //字典键值
    dictValue: string
    //字典类型
    dictType: string
    //样式属性（其他样式扩展）
    cssClass: string
    //表格回显样式
    listClass: string
    //是否默认（Y是 N否）
    isDefault: string
    //状态（0正常 1停用）
    status: number
    //创建者
    create_by: string
    //创建时间
    create_time: number
    //更新者
    update_by: string
    //更新时间
    update_time: number
    //备注
    remark: string
}