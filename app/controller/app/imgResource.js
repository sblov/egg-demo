const Controller = require('egg').Controller;

class ImgResourceController extends Controller {

    async index() {
        const {ctx} = this;

        const imgInfo = await this.ctx.service.app.imgResource.findAll();

        this.ctx.body = imgInfo;
    }
}

module.exports = ImgResourceController;