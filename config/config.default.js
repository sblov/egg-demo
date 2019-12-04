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
  config.middleware = ['secure'];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  config.logger = {
    dir: '/logs/egg-demo',
  }

  config.passportLocal = {
    usernameField: 'username',
    passwordField: 'password',
  };

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
      '.html': 'nunjucks',
    },
    // 果配置了 defaultExtension 可以省略后缀。
    defaultExtension: '.html',
  };

  config.logger = {
    outputJSON: true,
  }

  config.keys = 'key1,key2'

  config.onerror = {
    errorPageUrl: '/50x', 
    html(err, ctx) {
      // html hander
      ctx.body = '<h3>'+err+'</h3>';
      ctx.status = 500;
    },
    json(err, ctx) {
      // json hander
      ctx.body = { message: err, code: -1 };
      ctx.status = 500;
    },
  }

  config.notfound =  {
    pageUrl: '/404',
  }

  config.static = {
    // 静态化访问前缀,如：`http://127.0.0.1:7001/static/images/logo.png`
    prefix: '/', 
    dir: path.join(appInfo.baseDir, 'app/public'), // `String` or `Array:[dir1, dir2, ...]` 静态化目录,可以设置多个静态化目录
    // dynamic: false, // 如果当前访问的静态资源没有缓存，则缓存静态文件，和`preload`配合使用；
    // preload: true,
    // maxAge: 31536000, // in prod env, 0 in other envs
    // buffer: false, // in prod env, false in other envs
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