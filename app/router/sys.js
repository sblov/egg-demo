module.exports = app => {
    const {
        router,
        controller
    } = app;

    router.get('/sys/login', controller.sys.user.login);
    router.get('/sys/register', controller.sys.user.register);
    router.get('/sys/group', controller.sys.user.getGroupByUserId);
    router.resources('user', '/sys/user', controller.sys.user);
}