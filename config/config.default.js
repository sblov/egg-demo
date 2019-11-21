/* eslint valid-jsdoc: "off" */

'use strict';

const db = require('./db');
const path = require('path');

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

  config.security = {
    csrf: {
      headerName: 'x-csrf-token', // 自定义请求头
      enable: false,
    }
  }

  config.view = {
    root: [
      path.join(appInfo.baseDir, 'app/view'),
      // 配置多个目录，以 , 分割，会从多个目录查找文件
      // path.join(appInfo.baseDir, 'path/to/another'),
    ].join(','),
    mapping: {
      '.nj': 'nunjucks',
    },
    // 果配置了 defaultExtension 可以省略后缀。
    defaultExtension: '.nj',
  };

  config.logger = {
    outputJSON: true,
  }

  config.keys = 'key1,key2'

  config.onerror = {
    all(err, ctx) {
      // 在此处定义针对所有响应类型的错误处理方法
      // 注意，定义了 config.all 之后，其他错误处理方法不会再生效
      ctx.body = 'error';
      ctx.status = 500;
    },
    html(err, ctx) {
      // html hander
      ctx.body = '<h3>error</h3>';
      ctx.status = 500;
    },
    json(err, ctx) {
      // json hander
      ctx.body = { message: 'error' };
      ctx.status = 500;
    },
    jsonp(err, ctx) {
      // 一般来说，不需要特殊针对 jsonp 进行错误定义，jsonp 的错误处理会自动调用 json 错误处理，并包装成 jsonp 的响应格式
    },
  }

  config.notfound =  {
    pageUrl: '/404',
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