const assert = require('assert');

module.exports = app => {
  app.beforeStart(async () => {
    // 示例：启动的时候去读取 https://registry.npm.taobao.org/egg/latest 的版本信息
    const result = await app.curl('https://registry.npm.taobao.org/egg/latest', {
      dataType: 'json',
    });
    app.logger.info('Egg latest version: %s', result.data.version);
  });
  app.passport.verify(async (ctx, user) => {
    // check user
    assert(user.provider, 'user.provider should exists');
    assert(user.id, 'user.id should exists');

    // find user from database
    //
    // Authorization Table
    // column   | desc
    // ---      | --
    // provider | provider name, like github, twitter, facebook, weibo and so on
    // uid      | provider unique id
    // user_id  | current application user id
    console.log(user)

    const auth = await ctx.model.Authorization.findOne({
      where: {
        uid: user.id,
        provider: user.provider,
      }
    });

    console.log(auth)

    if (auth == null) {
      const newUser = await ctx.service.sys.user.register(user);

      console.log(newUser)

      return newUser;
    }

    const existsUser = await ctx.model.User.findOne({
      where: {
        id: auth.user_id
      }
    });
    if (existsUser) {
      return existsUser;
    }

    return null;
  });

  // 将用户信息序列化后存进 session 里面，一般需要精简，只保存个别字段
  app.passport.serializeUser(async (ctx, user) => {
    // 处理 user
    // ...
    return user;
  });

  // 反序列化后把用户信息从 session 中取出来，反查数据库拿到完整信息
  app.passport.deserializeUser(async (ctx, user) => {
    // 处理 user
    // ...
    return user;
  });
}