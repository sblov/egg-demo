module.exports = app => {
    const {
        STRING,
        DATE,
        NOW
    } = app.Sequelize;

    // 定义model
    const Group = app.model.define('u_group', {
        group_name: STRING(30),
        group_code: STRING(30),
        created_time: {
            type: DATE,
            defaultValue: NOW,
        },
        updated_time: {
            type: DATE,
            defaultValue: NOW,
        },
    }, {
        timestamps: false,
    });


    // 定义关联关系
    Group.associate = () => {
        Group.belongsToMany(app.model.User, {
            through: app.model.UserGroup,
            as: 'partner',
            foreignKey: 'group_id',
            constraints: false,
        });
    };


    return Group;
}