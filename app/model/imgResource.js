module.exports = app => {
    const {
        STRING,
        INTEGER,
        DATE,
        NOW
    } = app.Sequelize;


    const imgResource = app.model.define('t_img_resource', {
        img_src: STRING,
        img_alt: STRING,
        img_origin: STRING,
        flag: INTEGER,
        nginx_path: STRING,
        created_time: {
            type: DATE,
            defaultValue: NOW,
        }
    },{
        timestamps: false,
    });

    return imgResource;
}