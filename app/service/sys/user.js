const Service = require('egg').Service;

class UserService extends Service {
    // 通过id获取用户信息
    getUserById = async (
        id,
    ) => {
        const {
            ctx
        } = this;

        let userInfo = {};
        try {
            userInfo = await ctx.model.User.findAll({
                where: {
                    id,
                },
                // 查询操作的时候，加入这个参数可以直接拿到对象类型的查询结果，否则还需要通过方法调用解析
                // raw: true,
            });

            userInfo[0].logSignin();
        } catch (err) {
            ctx.logger.error(err);
        }

        return userInfo;
    }

    register1 = async ({
        login,
        name,
        password
    }) => {
        const {
            ctx
        } = this;
        let transaction;

        try {
            // 这里需要注意，egg-sequelize会将sequelize实例作为app.model对象
            transaction = await ctx.model.transaction();

            // 创建用户
            const user = await ctx.model.User.create({
                login,
                name,
                password,
            }, {
                transaction,
            });

            // 创建默认组
            const group = await ctx.model.Group.create({
                group_name: 'default',
                group_code: '1',
            }, {
                transaction,
            });

            const userId = user && user.getDataValue('id');
            const groupId = group && group.getDataValue('id');

            if (!userId || !groupId) {
                throw new Error('创建用户失败');
            }

            // 创建用户和组之间的关联
            const associate = await ctx.model.UserGroup.create({
                user_id: userId,
                group_id: groupId,
            }, {
                transaction,
            });

            await transaction.commit();

            return userId;
        } catch (err) {
            ctx.logger.error(err);
            await transaction.rollback();
        }
    }

    register = async (authUser) => {

        const { ctx } = this;

        let transaction;
        try {
            transaction = await ctx.model.transaction();
 
            let name = Math.random().toString(36).substr(2);

            // 创建用户
            const user = await ctx.model.User.create({
                name,
            }, {
                transaction,
            });

            const auth = await ctx.model.Authorization.create({
                provider: authUser.provider,
                uid : authUser.id,
                user_id : user.getDataValue('id')
            },{
                transaction,
            })
            
            const userId = user && user.getDataValue('id');
            const authId = auth && auth.getDataValue('id');

            if (!userId || !authId) {
                throw new Error('创建用户失败');
            }

            
            await transaction.commit();

            return user;
        } catch (err) {
            ctx.logger.error(err);
            await transaction.rollback();
        }

    }
}

module.exports = UserService;