import { Controller, Get, HttpCode, Inject } from "@midwayjs/core";
import { Context } from "@midwayjs/koa";
import { generateId } from "../../../utils/UidUtils";
import { create, createMathExpr } from 'svg-captcha';
import * as svgBase64 from 'mini-svg-data-uri';
import { RedisCache } from "../../../source/redis";
import { CAPTCHA_CODE_KEY, CAPTCHA_EXPIRATION } from "../../../constants/captcha";
import { Result } from "../../../common/result";
/*
 * @Description: 验证码路由
 * @Author: huangyue
 * @LastEditors: huangyue
 * @LastEditTime: 2023-03-23 18:03:51
 */

@Controller()
export class CaptchaController {

    @Inject()
    ctx: Context

    @Inject()
    redisCache: RedisCache

    @Get('/captchaImage')
    @HttpCode(200)
    async captchaImage(): Promise<Result> {
        //是否开启验证码
        const captchaEnabled = true
        // 生成唯一标识
        const uuid = generateId(16);
        const verifyKey = CAPTCHA_CODE_KEY + uuid;
        let data = {
            captchaEnabled: captchaEnabled,
            uuid: uuid,
            img: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'
        }
        // 从本地配置project获取验证码类型
        const { captchaType } = this.ctx.app.getConfig('project');
        if (captchaType === 'math') {
            const captcha = createMathExpr(this.ctx.app.getConfig('mathCaptcha'));
            data.img = svgBase64(captcha.data);
            await this.redisCache.setByExpire(verifyKey, captcha.text, CAPTCHA_EXPIRATION);
        }
        if (captchaType === 'char') {
            const captcha = create(this.ctx.app.getConfig('charCaptcha'));
            data.img = svgBase64(captcha.data);
            await this.redisCache.setByExpire(verifyKey, captcha.text, CAPTCHA_EXPIRATION);
        }
        // 本地开发下返回结果
        if ((this.ctx.app.getEnv() == 'local')) {
            data = Object.assign({
                text: await this.redisCache.get(verifyKey)
            }, data);
        }
        return Result.ok(data);
    }

}