/* eslint valid-jsdoc: "off" */

'use strict';

const db = require('./db');

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {

  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1573746216925_4765';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  config.logger = {
    dir: '/logs/egg-demo',
  }

  // https://github.com/settings/applications/
  config.passportGithub = {
    key: 'e64338613b55ad91d49d',
    secret: '41913d814e5bac3943699fd82e0c2bedbf2a9d17',
  }

  config.security= {
    csrf : {
      headerName: 'x-csrf-token',// 自定义请求头
      enable: false,
    }
 }

  // 连接数据库
  config.sequelize = {
    delegate: 'model',
    baseDir: 'model',
    dialect: 'mysql',
    connectionUri: db.url,
    username: db.username,
    password: db.password,
    define: {
      freezeTableName: true,
      underscored: true,
    },
    timezone: '+08:00', // 保存为本地时区
    dialectOptions: {
      dateStrings: true,
      typeCast(field, next) {
        // for reading from database
        if (field.type === "DATETIME") {
          return field.string();
        }
        return next();
      }
    }
  }

  return {
    ...config,
    ...userConfig,
  };
};