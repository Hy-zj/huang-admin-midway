/*
 * @Description:  用户登录对象
 * @Author: huangyue
 * @LastEditors: huangyue
 * @LastEditTime: 2023-03-23 17:49:10
 */

export class LoginBody {
    /**用户名 */
    username: string;

    /**用户密码 */
    password: string;

    /**验证码 */
    code: string;

    /**验证码唯一标识 */
    uuid: string;
}
