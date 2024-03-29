'use strict';

/** @type Egg.EggPlugin */
module.exports = {
  // 开启插件 
  sequelize: {
    enable: true,
    package: 'egg-sequelize'
  },
  passport : {
    enable: true,
    package: 'egg-passport',
  },
  passportLocal : {
    enable: true,
    package: 'egg-passport-local',
  },
  passportGithub : {
    enable: true,
    package: 'egg-passport-github',
  },
  nunjucks : {
    enable: true,
    package: 'egg-view-nunjucks',
  },

};
