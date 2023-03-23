/*
 * @Description: 封装数据库操作
 * @Author: huangyue
 * @LastEditors: huangyue
 * @LastEditTime: 2023-03-23 17:27:21
 */

import { Provide, Inject, Scope, ScopeEnum } from "@midwayjs/core";
import { TypeORMDataSourceManager } from "@midwayjs/typeorm";
import { DataSource, QueryRunner } from "typeorm";


@Provide()
@Scope(ScopeEnum.Singleton) //单例模式
export class MysqlManager {
    @Inject()
    private dataSourceManager: TypeORMDataSourceManager;

    /**
     * 数据源
     * @param source 数据库连接
     * @returns 连接实例
     */
    public dataSource(source = 'default'): DataSource {
        return this.dataSourceManager.getDataSource(source);
    }

    /**
     * 获取可用数据源名称
     * @returns 数据源名称
     */
    public dataSourceNames(): string[] {
        return this.dataSourceManager.getDataSourceNames();
    }

    /**
     * 执行sql语句
     * @param sql sql预编译语句
     * @param parameters 预编译?参数
     * @param source 数据源 默认'default'
     * @returns 查询结果或异常错误
     */
    public execute(
        sql: string,
        parameters?: any[],
        source = 'default'
    ): Promise<any> {
        return this.dataSource(source).query(sql, parameters);
    }

    /**
     * 创建和控制单个数据库连接的状态
     * 控制事务
     * startTransaction- 在查询运行器实例中启动一个新事务。
     * commitTransaction- 提交使用查询运行器实例所做的所有更改。
     * rollbackTransaction- 回滚使用查询运行程序实例所做的所有更改。
     * @param source 数据源 默认'default'
     * @returns 查询结果或异常错误
     */
    public execute_runner(source = 'default'): QueryRunner {
        return this.dataSource(source).createQueryRunner();
    }
}