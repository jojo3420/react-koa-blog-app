const jwt = require('jsonwebtoken');



// Book solutions
// exports.checkLoggedIn = (ctx, next) => {
//   if (!ctx.status.user) {
//     ctx.status = 401;
//     return;
//   }
//   return next();
// }

// jwtMiddleware 에서 토큰에 대한 인증을 하므로 중복코드임
// const checkLoggedIn = async (ctx, next) => {
//   const token = ctx.cookies.get('access_token');
//   console.log({ checkLoggedIn_token: token});
//   if (!token) {
//     ctx.status = 401; // Unauthorized
//     return;
//   }
//   try {
//     const decoded =  jwt.verify(token, process.env.JWT_SECRET_KEY);
//     console.log({ decoded });
//     await next();
//   } catch (e) {
//     ctx(500, e);
//   }
// }

const checkLoggedIn =   (ctx, next) => {
  if (!ctx.state.user) {
    ctx.status = 401;
    return;
  }
  return next();
};


module.exports = checkLoggedIn;

