'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    // ctx.body = 'hi, egg';

    await ctx.render('index', {user: 'sblov'});
  }

  async curl() {
    const { ctx } = this;
    // 示例：请求一个 npm 模块信息
    const result = await ctx.curl('https://registry.npm.taobao.org/egg/latest', {
      // 自动解析 JSON response
      dataType: 'json',
      // 3 秒超时
      timeout: 3000,
    });

    ctx.body = {
      status: result.status,
      headers: result.headers,
      package: result.data,
    };
  }

  async setCookie(){
    const ctx = this.ctx;
    let count = ctx.cookies.get('count', {
      signed: false,
      encrypt: true,
    });
    ctx.logger.info(count)

    count = count ? Number(count) : 0;
    ctx.cookies.set('count', (++count)+'', {
      httpOnly: true, // 默认就是 true
      encrypt: true, // 加密传输
    });
    ctx.body = count;
  }

  async delCookie() {
    const ctx = this.ctx;
    ctx.cookies.set('count', null);
    ctx.status = 204;
  }

  async error(){
    throw new Error
  }

  async nofound(){
    const ctx = this.ctx;
    
    await ctx.render('404');
  }
}

module.exports = HomeController;
