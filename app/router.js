'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/404', controller.home.nofound);
  router.get('/', controller.home.index);
  router.get('/curl', controller.home.curl);
  router.get('/set-c', controller.home.setCookie);
  router.get('/del-c', controller.home.delCookie);
  router.get('/error', controller.home.error);
  router.get('/login',  controller.sys.user.login);
  router.get('/register',  controller.sys.user.register);
  router.get('/group',  controller.sys.user.getGroupByUserId);
  router.resources('user', '/sys/user', controller.sys.user)

  // authenticates routers
  app.passport.mount('github');
};
