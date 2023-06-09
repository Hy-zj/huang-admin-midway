/*
 * @Description: 通用结果工具类
 * @Author: huangyue
 * @LastEditors: huangyue
 * @LastEditTime: 2023-03-23 16:18:07
 */
import { SUCCESS, ERROR } from '../constants/httpStatus';

export class Result {
    /**响应状态码 */
    code: number;
    /**响应信息 */
    msg: string;
    /**其余自定义属性 */
    [key: string]: any;

    /**
    * 成功结果
    * @param args 额外参数 {value:1}
    * @return 响应结果对象
    */
    public static ok(args?: Record<string, any>) {
        return this.rest(SUCCESS, '成功', args);
    }

    /**
    * 成功结果信息
    * @param msg 响应信息
    * @param code 响应状态码
    * @return 响应结果对象
    */
    public static okMsg(msg: string, code: number = SUCCESS) {
        return this.rest(code, msg);
    }

    /**
    * 成功结果数据
    * @param data 数据值
    * @return 响应结果对象
    */
    public static okData<T>(data: T) {
        return this.rest(SUCCESS, '成功', { data });
    }

    private static rest(code: number, msg: string, args: Record<string, any> = {}) {
        const res = new Result();
        res.code = code;
        res.msg = msg;
        // 展开参数混入
        for (const key of Object.keys(args)) {
            res[key] = args[key];
        }
        return res;
    }

    /**
    * 失败结果
    * @param args 额外参数 {value:1}
    * @return 响应结果对象
    */
    public static err(args?: Record<string, any>) {
        return this.rest(ERROR, '失败', args);
    }


    /**
     * 失败结果信息
     * @param msg 响应信息
     * @param code 响应状态码
     * @return 响应结果对象
     */
    public static errMsg(msg: string, code: number = ERROR) {
        return this.rest(code, msg);
    }

    /**
     * 失败结果数据
     * @param data 数据值
     * @return 响应结果对象
     */
    public static errData<T>(data: T) {
        return this.rest(ERROR, '失败', { data });
    }

}