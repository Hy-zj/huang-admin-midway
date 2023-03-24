/*
 * @Description: 
 * @Author: huangyue
 * @LastEditors: huangyue
 * @LastEditTime: 2023-03-24 15:09:53
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
  /**请求头令牌自定义标识 */
  jwtHeader: 'Authorization',
  /**jwt令牌配置 https://github.com/auth0/node-jsonwebtoken */
  /**验证令牌有效期，相差不足xx分钟，自动刷新缓存 */
  jwtRefreshIn: '20m', // https://github.com/vercel/ms
  jwt: {
    /**令牌算法 */
    algorithm: 'HS512',
    /**令牌密钥 */
    secret: 'abcdefghijklmnopqrstuvwxyz', // fs.readFileSync('xxxxx.key')
    /**令牌有效期（默认30分钟） */
    expiresIn: '640m', // https://github.com/vercel/ms
  },
  /**char 字符验证码配置 */
  charCaptcha: {
    /**干扰线条的数量 */
    noise: 4,
    /**验证码的字符是否有颜色，默认没有，如果设定了背景，则默认有 */
    color: true,
    // 验证码图片背景颜色
    background: '#f5f5f5',
    /**验证码长度 */
    size: 4,
    /**验证码字符中排除 0o1i */
    ignoreChars: '0o1i',
  },

  /**math 数组计算码配置 */
  mathCaptcha: {
    /**干扰线条的数量 */
    noise: 4,
    /**验证码的字符是否有颜色，默认没有，如果设定了背景，则默认有 */
    color: true,
    // 验证码图片背景颜色
    background: '#f5f5f5',
    /**计算式，默认"+"，可选"+", "-" or "+/-" */
    mathOperator: '+',
    /**算数值最小值，默认1 */
    mathMin: 1,
    /**算数值最大值，默认9 */
    mathMax: 9,
  },
  /**用户配置 */
  user: {
    /**密码 */
    password: {
      /**密码最大错误次数 */
      maxRetryCount: 5,
      /**密码锁定时间（默认10分钟） */
      lockTime: 10,
    },
    /**超级管理员列表 */
    superAdmin: ['1'],
  },
} as MidwayConfig;
