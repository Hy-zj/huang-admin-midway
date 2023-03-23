/*
 * @Description: 系统用户接口
 * @Author: huangyue
 * @LastEditors: huangyue
 * @LastEditTime: 2023-03-23 17:32:27
 */
export interface SysUserInterface {
    /**
 * 根据条件分页查询用户列表
 *
 * @param query 用户信息查询信息
 * @return 用户信息集合信息
 */
    selectUserPage(query: any): Promise<rowPages>;
}