/*
 * @Description: 部门业务层
 * @Author: huangyue
 * @LastEditors: huangyue
 * @LastEditTime: 2023-03-27 11:24:37
 */
import { Inject, Provide } from '@midwayjs/core';
import { IDept } from '../interface/dept.interface';
import { Dept } from '../model/dept.model';
import { MysqlManager } from '../../../../source/mysql';

/**查询视图对象SQL */
const SELECT_DEPT_VO = `select d.dept_id,d.parent_id,d.ancestors,d.dept_name,d.order_num,d.leader,d.phone,d.email,d.status,d.create_by,d.create_time,d.update_by,d.update_time from sys_dept d`

/**部门信息实体映射 */
const SYS_DEPT_RESULT = new Map<string, string>();
SYS_DEPT_RESULT.set('dept_id', 'deptId');
SYS_DEPT_RESULT.set('parent_id', 'parentId');
SYS_DEPT_RESULT.set('ancestors', 'ancestors');
SYS_DEPT_RESULT.set('dept_name', 'deptName');
SYS_DEPT_RESULT.set('order_num', 'orderNum');
SYS_DEPT_RESULT.set('leader', 'leader');
SYS_DEPT_RESULT.set('phone', 'phone');
SYS_DEPT_RESULT.set('email', 'email');
SYS_DEPT_RESULT.set('status', 'status');
SYS_DEPT_RESULT.set('del_flag', 'delFlag');
SYS_DEPT_RESULT.set('create_by', 'createBy');
SYS_DEPT_RESULT.set('create_time', 'createTime');
SYS_DEPT_RESULT.set('update_by', 'updateBy');
SYS_DEPT_RESULT.set('update_time', 'updateTime');

/**
 *将结果记录转实体结果组
 * @param rows 查询结果记录
 * @returns 实体组
 */
function parseSysDeptResult(rows: Dept[]): Dept[] {
    let sysDepts: Dept[] = []
    rows.forEach(row => {
        let sysDept = new Dept()
        for (const key in row) {
            if (SYS_DEPT_RESULT.has(key)) {
                const keyMapper = SYS_DEPT_RESULT.get(key);
                sysDept[keyMapper] = row[key]
            }
        }
        sysDepts.push(sysDept);
    })
    return sysDepts
}

@Provide()
export class DeptService implements IDept {
    @Inject()
    db: MysqlManager

    async selectDeptList(dept: Dept): Promise<Dept[]> {
        let sqlStr = `${SELECT_DEPT_VO}  where d.del_flag = 0 `
        let paramArr = []
        if (dept?.deptId) {
            sqlStr += ' and dept_id = ? ';
            paramArr.push(dept.deptId);
        }
        if (dept?.parentId) {
            sqlStr += ' and parent_id = ? ';
            paramArr.push(dept.parentId);
        }
        if (dept?.deptName) {
            sqlStr += " and dept_name like concat('%', ?, '%') ";
            paramArr.push(dept.deptName);
        }
        if (dept?.status) {
            sqlStr += ' and status = ? ';
            paramArr.push(dept.status);
        }
        sqlStr += ' order by d.parent_id, d.order_num asc ';

        const rows = await this.db.execute(sqlStr, paramArr)
        const sysDepts = parseSysDeptResult(rows)
        return sysDepts
    }
}