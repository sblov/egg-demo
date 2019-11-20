module.exports = app => {
    const {
        STRING,
        INTEGER,
        DATE,
        NOW
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
        created_time: {
            type: DATE,
            // 属性对应字段名，类似@TableField
            field: 'created_time',
            allowNull: false,
            defaultValue: NOW,
        },
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

    // 定义关联关系
    User.associate = () => {
        // 定义多对多关联
        User.belongsToMany(app.model.Group, {
            // 中间表的model
            through: app.model.UserGroup,
            // 进行关联查询时，关联表查出来的数据模型的alias
            as: 'project',
            // 必须声明外键，否则会使用默认的关联字段，为相关表名+id
            foreignKey: 'user_id',
            // 是否采用外键进行物理关联
            constraints: false,
        });
        // 这里如果一个模型和多个模型都有关联关系的话，关联关系需要统一定义在这里
    };


    return User;
}