const Service = require('egg').Service;

class ImgResourceService extends Service {

    async findAll(){
        const {ctx} = this;

        let imgInfo = {};
        try {
            imgInfo = await ctx.model.ImgResource.findAll({
                raw: true,
            });

        } catch (err) {
            ctx.logger.error(err);
        }

        return imgInfo;
    }

}

module.exports = ImgResourceService;