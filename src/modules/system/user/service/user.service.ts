/*
 * @Description: 系统用户业务层
 * @Author: huangyue
 * @LastEditors: huangyue
 * @LastEditTime: 2023-03-24 11:26:48
 */
import { Inject, Provide } from '@midwayjs/core';
import { SysUserInterface } from '../interface/user.interface';
import { MysqlManager } from '../../../../source/mysql'
import { SysUser } from '../model/user.model';

/**用户信息实体映射 */
const SYS_USER_RESULT = new Map<string, string>();
SYS_USER_RESULT.set('user_id', 'userId');
SYS_USER_RESULT.set('dept_id', 'deptId');
SYS_USER_RESULT.set('user_name', 'userName');
SYS_USER_RESULT.set('nick_name', 'nickName');
SYS_USER_RESULT.set('email', 'email');
SYS_USER_RESULT.set('phonenumber', 'phonenumber');
SYS_USER_RESULT.set('sex', 'sex');
SYS_USER_RESULT.set('avatar', 'avatar');
SYS_USER_RESULT.set('password', 'password');
SYS_USER_RESULT.set('status', 'status');
SYS_USER_RESULT.set('del_flag', 'delFlag');
SYS_USER_RESULT.set('login_ip', 'loginIp');
SYS_USER_RESULT.set('login_date', 'loginDate');
SYS_USER_RESULT.set('create_by', 'createBy');
SYS_USER_RESULT.set('create_time', 'createTime');
SYS_USER_RESULT.set('update_by', 'updateBy');
SYS_USER_RESULT.set('update_time', 'updateTime');
SYS_USER_RESULT.set('remark', 'remark');

/**
 *将结果记录转实体结果组
 * @param rows 查询结果记录
 * @returns 实体组
 */
function parseSysUserResult(rows) {
    const sysUsers: SysUser[] = [];
    for (const row of rows) {
        const sysUser = new SysUser();
        for (const key in row) {
            if (SYS_USER_RESULT.has(key)) {
                const keyMapper = SYS_USER_RESULT.get(key);
                sysUser[keyMapper] = row[key];
            }
        }
        sysUsers.push(sysUser);
    }
    return sysUsers;
}

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

    async selectUserByUserName(userName: string): Promise<SysUser> {
        const sql = `select 
        u.user_id, u.dept_id, u.user_name, u.nick_name, u.email, u.avatar, u.phonenumber, u.password, u.sex, u.status, u.del_flag, u.login_ip, u.login_date, u.create_by, u.create_time, u.remark
        from sys_user u where u.del_flag = '0' and u.user_name = ?`

        let paramArr = [userName]
        // 获取用户数据
        const rows = await this.db.execute(sql, paramArr)
        // 统一格式数据
        const sysUsers = parseSysUserResult(rows)
        //判空
        if (sysUsers.length === 0) {
            return null;
        }
        //创建实例
        let sysUser = new SysUser()

        //遍历插入数据
        sysUsers.forEach((v, i) => {
            if (i === 0) {
                sysUser = v;
            }
        });

        return sysUser
    }
}