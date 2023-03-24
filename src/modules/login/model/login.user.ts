/*
 * @Description: 登陆用户
 * @Author: huangyue
 * @LastEditors: huangyue
 * @LastEditTime: 2023-03-24 10:21:38
 */
import { SysUser } from "../../system/user/model/user.model";
export class LoginUser {
    /**用户ID */
    userId: string;

    /**部门ID */
    deptId: string;

    /**用户唯一标识 */
    uuid: string;

    /**登录时间时间戳 */
    loginTime: number;

    /**过期时间时间戳 */
    expireTime: number;

    /**登录IP地址 x.x.x.x */
    ipaddr: string;

    /**登录地点 xx xx */
    loginLocation: string;

    /**浏览器类型 */
    browser: string;

    /**操作系统 */
    os: string;

    /**权限列表 */
    permissions: string[];

    /**用户信息 */
    user: SysUser;
}