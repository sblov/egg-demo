module.exports = app => {
    const {
        STRING,
        INTEGER,
    } = app.Sequelize;

    // 定义model
    const Authorization = app.model.define('u_auth', {
        provider: STRING(30),
        uid: INTEGER,
        user_id: INTEGER,
    }, {
        timestamps: false,
    });

    return Authorization;
}