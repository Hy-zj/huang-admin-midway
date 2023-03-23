/*
 * @Description: 开发环境
 * @Author: huangyue
 * @LastEditors: huangyue
 * @LastEditTime: 2023-03-23 15:47:11
 */
import { MidwayConfig } from '@midwayjs/core';

export default {
    koa: {
        port: 7001,
    },
    // 数据源
    typeorm: {
        dataSource: {
            // 单数据库实例
            default: {
                type: 'mysql',
                host: '127.0.0.1',
                port: 3306,
                username: 'root',
                password: 'hy741065',
                database: 'huang-admin',
                synchronize: false, // 用于同步表结构, 上线设置false
                logging: true, // 输出sql日志
            }
        },
    },
    redis: {
        client: {
            port: 6379, // Redis port
            host: "127.0.0.1", // Redis host
            db: 0,
        },
    },
} as MidwayConfig;
