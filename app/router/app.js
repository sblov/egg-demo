module.exports = app => {
    const {
        router,
        controller
    } = app;

    router.get('/404', controller.home.nofound);
    router.get('/50x', controller.home.onerror);
    router.get('/', controller.home.index);
    router.get('/login', controller.home.login);
    router.get('/curl', controller.home.curl);
    router.get('/set-c', controller.home.setCookie);
    router.get('/del-c', controller.home.delCookie);
    router.get('/error', controller.home.error);
    
    router.get('/crawler/home', controller.xlov.crawler.index);
    router.get('/crawler/list', controller.xlov.crawler.list);
    router.get('/crawler/code', controller.xlov.crawler.code);
    router.get('/crawler/img', controller.xlov.crawler.img);

    router.resources('img_resource', '/app/img-resource', controller.app.imgResource);

    // github登录认证
    app.passport.mount('github');
    // 本地登录认证
    const localStrategy = app.passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/'
    });
    router.post('/passport/local', localStrategy);
}