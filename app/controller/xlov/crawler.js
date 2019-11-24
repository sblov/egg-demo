'use strict';

const Controller = require('egg').Controller;

class CrawlerController extends Controller {
  async index() {
    const { ctx } = this;

    await ctx.render('app/index');
  }

  async list() {
    const { ctx } = this;

    await ctx.render('app/list');
  }

  async code() {
    const { ctx } = this;

    await ctx.render('app/code');
  }
  
}

module.exports = CrawlerController;
