/*
 * @Description:  
 * @Author: huangyue
 * @LastEditors: huangyue
 * @LastEditTime: 2023-03-24 14:24:29
 */
import '@midwayjs/core';
import { LoginUser } from './modules/login/model/login.user';


/**扩展 Midway 通用的 Context */
declare module '@midwayjs/core' {
    interface Context {
        /**登录用户身份权限信息 */
        loginUser: LoginUser;
    }
}
