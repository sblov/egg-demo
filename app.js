const assert = require('assert');

module.exports = app => {
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
        where:{
        uid: user.id,
        provider: user.provider,
        }
      });

      console.log(auth)

      if(auth == null){
        const newUser = await ctx.service.sys.user.register(user);

        console.log(newUser)

        return newUser;
      }

      const existsUser = await ctx.model.User.findOne({ where:{id: auth.user_id }});
      if (existsUser) {
        return existsUser;
      }
      
      return null;
    });
  }