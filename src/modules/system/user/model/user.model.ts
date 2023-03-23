/*
 * @Description: 系统用户实体类
 * @Author: huangyue
 * @LastEditors: huangyue
 * @LastEditTime: 2023-03-23 17:18:30
 */

export class SysUser {
    /**用户ID */
    userId: string;

    /**部门ID */
    deptId: string;

    /**用户账号 */
    userName: string;

    /**用户昵称 */
    nickName: string;

    /**用户类型（00系统用户） */
    userType: string;

    /**用户邮箱 */
    email: string;

    /**手机号码 */
    phonenumber: string;

    /**用户性别（0未知 1男 2女） */
    sex: string;

    /**头像地址 */
    avatar: string;

    /**密码 */
    password: string;

    /**帐号状态（0正常 1停用） */
    status: string;

    /**删除标志（0代表存在 1代表停用 2代表删除） */
    delFlag: string;

    /**最后登录IP */
    loginIp: string;

    /**最后登录时间 */
    loginDate: number;

    /**创建者 */
    createBy: string;

    /**创建时间 */
    createTime: number;

    /**更新者 */
    updateBy: string;

    /**更新时间 */
    updateTime: number;

    /**备注 */
    remark: string;
}