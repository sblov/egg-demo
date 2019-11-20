module.exports = app => {
    const { INTEGER } = app.Sequelize;

    const UserGroup = app.model.define(
        'u_user_group',
        {
            user_id: INTEGER,
            group_id: INTEGER,
        },
        {
            timestamps: false,
            freezeTableName: true,
            tableName: 'u_user_group',
            underscored: true,
        }
    );

    return UserGroup;
};