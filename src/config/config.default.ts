/*
 * @Description: 
 * @Author: huangyue
 * @LastEditors: huangyue
 * @LastEditTime: 2023-03-23 15:56:38
 */
import { MidwayConfig } from '@midwayjs/core';
import { join } from 'path'
export default {
  keys: 'huang-admin for node',
  koa: {
    port: 7001,
  },
  // 项目相关配置
  project: {
    // 名称
    name: 'Huang-Admin-Midway',
    // 版本
    version: '1.0.0',
    // 版权年份
    copyrightYear: 2023,
    // 验证码类型 math 数组计算 char 字符验证
    captchaType: 'math',
  },
  view: {
    root: join(__dirname, '../view'),
    mapping: {
      '.html': 'ejs',
    },
  },
  // 数据源
  typeorm: {
    dataSource: {
      // 单数据库实例
      default: {
        type: 'mysql',
        host: '',
        port: 3306,
        username: '',
        password: '',
        database: undefined,
        synchronize: false, // 如果第一次使用，不存在表，有同步的需求可以写 true
        logging: false, // 输出sql日志
        dateStrings: true, // 输出时间字段转字符串 yyyy-MM-dd hh:mm:ss
        entities: [
          '**/model/**/*.model{.ts,.js}'
        ]
      }
    },
  },
  /**Redis 缓存数据 http://www.midwayjs.org/docs/extensions/redis */
  redis: {
    client: {
      port: 6379, // Redis port
      host: '127.0.0.1', // Redis host
      db: 0,
    },
  },
  /**jwt令牌配置 https://github.com/auth0/node-jsonwebtoken */
  jwt: {
    /**令牌算法 */
    algorithm: 'HS512',
    /**令牌密钥 */
    secret: 'abcdefghijklmnopqrstuvwxyz', // fs.readFileSync('xxxxx.key')
    /**令牌有效期（默认30分钟） */
    expiresIn: '640m', // https://github.com/vercel/ms
  },
} as MidwayConfig;
