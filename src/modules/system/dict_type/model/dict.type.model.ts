/*
 * @Description: 字典类型实例
 * @Author: huangyue
 * @LastEditors: huangyue
 * @LastEditTime: 2023-03-27 11:46:53
 */

export class DictType {
    //字典主键
    dictId: number
    //字典名称
    dictName: string
    //字典类型
    dictType: string
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