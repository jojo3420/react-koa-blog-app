const jwt = require('jsonwebtoken');
const User = require('../models/user');

const checkToken = async (ctx, next) => {
  const token = ctx.cookies.get('access_token');
  // console.log({ jwtMiddleware_token: token });
  if (!token) {
    return next();
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    console.log({ '토큰 인증 결과: ': decoded });

    // binding user
    ctx.state.user = {
      _id: decoded._id,
      username: decoded.username,
    }

    // token 갱신 - 3.5일 남았으면 다시 7일로 갱신
    const now = Math.floor(Date.now() / 1000);
    if (decoded.exp - now < 60 * 60 * 24 * 3.5) {
      const user = await User.findById(decoded._id);
      const token = user.generateToken();
      ctx.cookies.set('access_token', token, {
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7days
        httpOnly: true,
      });
    }
    return next();

  } catch (e) {
    // ctx.throw(500, e);
    return next();
  }


};


module.exports = checkToken;
