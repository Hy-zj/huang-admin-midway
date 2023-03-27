import { Dept } from '../model/dept.model';
/*
 * @Description: 部门接口层
 * @Author: huangyue
 * @LastEditors: huangyue
 * @LastEditTime: 2023-03-27 10:49:07
 */


export interface IDept {
    /**
 * 查询部门管理数据
 *
 * @param sysDept 部门信息
 * @return 部门信息集合
 */
    selectDeptList(sysDept: Dept): Promise<Dept[]>;

}