const Controller = require('egg').Controller;

class UserController extends Controller {

    /**
     * 异步方法请求
     * GET /user
     */
    async index() {
        const {ctx} = this;
        ctx.logger.info('GET /user')
        ctx.logger.info(ctx.user)
        // console.log(this.ctx.model)
        const users = await this.ctx.model.User.findAll();

        this.ctx.body = users;
    }

    /** POST /user/:id */
    async show() {
        const user = await this.ctx.model.User.findByLogin(this.ctx.params.login);
        await user.logSignin();
        this.ctx.body = user;
    }

    /** GET /user/new */
    async new() {
        console.log('GET /user/new ')
    }

    /** GET /user/:id/edit */
    async edit() {
        console.log('GET /user/:id/edit')
    }

    /** POST /user */
    async create() {
        console.log('POST /user')
    }

    /** PUT /user/:id */
    async update() {
        console.log('PUT /user/:id')
    }

    /** DELETE /user/:id */
    async destroy() {
        console.log('DELETE /user/:id')
    }

    async login() {
        const login = this.ctx.query.login;
        console.log(this.ctx.query);

        const user = await this.ctx.service.sys.user.getUserById(login);
        this.ctx.body = user;
    }

    async register() {
        const userId = await this.ctx.service.sys.user.register({
            ...this.ctx.query
        });
        this.ctx.body = userId;
    }

    async getGroupByUserId() {
        let id = 10;

        const group = await this.ctx.model.User.findAll({
            attributes: ['project.id', 'project.group_name'],
            include: [{
                model: this.ctx.model.Group,
                as: 'project',
                // 指定关联表查询属性，这里表示不需要任何关联表的属性
                attributes: [],
                through: {
                    // 指定中间表的属性，这里表示不需要任何中间表的属性
                    attributes: []
                }
            }],
            where: {
                id,
            },
            raw: true,
            // 这个需要和上面的中间表属性配合，表示不忽略include属性中的attributes参数
            includeIgnoreAttributes: false,
        });

        this.ctx.body = group;
    }
}

module.exports = UserController;