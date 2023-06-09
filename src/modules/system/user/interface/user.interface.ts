import { SysUser } from "../model/user.model";

/*
 * @Description: 系统用户接口
 * @Author: huangyue
 * @LastEditors: huangyue
 * @LastEditTime: 2023-03-27 10:23:59
 */
export interface ISysUser {
    /**
 * 根据条件分页查询用户列表
 *
 * @param query 用户信息查询信息
 * @return 用户信息集合信息
 */
    selectUserPage(query: any): Promise<rowPages>;

    /**
   * 通过用户名查询用户
   *
   * @param userName 用户名
   * @return 用户对象信息
   */
    selectUserByUserName(userName: string): Promise<SysUser>;
}