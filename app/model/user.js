module.exports = app => {
    const {
        STRING,
        INTEGER,
        DATE
    } = app.Sequelize;

    // 定义model
    /**
     * arg1: 表名
     * arg2: model成员属性
     * arg3: model约束
     */
    const User = app.model.define('u_user', {
        login: STRING,
        name: STRING(30),
        password: STRING(32),
        age: INTEGER,
        last_sign_in_at: DATE,
        created_time: DATE,
        updated_time: DATE,
    },{
        // 取消自动维护时间戳，默认对model的时间戳，为created_at, updated_at
        timestamps: false,
        // 禁止修改表名，默认情况， sequelize将自动将所有传递的模型名称转换为复数
        // freezeTableName: true
    });

    // 查询 bylogin
    User.findByLogin = async function (login) {
        return await this.findOne({
            where: {
                login: login
            }
        });
    }



    // 
    User.prototype.logSignin = async function () {
        return await this.update({
            last_sign_in_at: new Date()
        });
    }

    return User;
}