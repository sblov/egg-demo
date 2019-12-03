/* 
  安全相关中间件
*/
module.exports = options => {
    return async function secure(ctx, next) {
        
        // 权限控制， 未登录重定向
        ctx.logger.debug(ctx.user)
        if(!ctx.user){
          ctx.logger.debug(ctx)
          if(ctx.originalUrl != '/' && ctx.originalUrl != '/login'){
              ctx.redirect('/login')
          }
        }
     
        await next();
  
    };
  };
  