'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  // router.get('/user',  controller.sys.user.index);
  router.resources('user', '/sys/user', controller.sys.user)
};
