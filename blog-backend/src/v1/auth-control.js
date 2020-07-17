const User = require('../models/user');
const Joi = require('joi');

/**
 * Register user
 * POST /v1/user/register
 * @param ctx
 * @return {Promise<void>}
 */
exports.register = async ctx => {
  const schema = Joi.object().keys({
    username: Joi.string().required(),
    password: Joi.string().required(),
  });
  const { error } = Joi.validate(ctx.request.body, schema);
  if (error) {
    ctx.status = 400;
    ctx.body = error;
    return;
  }
  const { username, password } = ctx.request.body;


  // username 중복 검사
  const valid = await User.findOne({ username });
  if (valid) {
    ctx.status = 402;
    ctx.body = {
      message: 'username 이 중복 입니다.',
      username,
    };
    return;
  }

  try {
    const user = new User({ username });
    await user.setPassword(password);
    await user.save();
    ctx.body = user.serialize();

    const token = user.generateToken();
    ctx.cookies.set('access_token', token, {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      httpOnly: true,
    });

  } catch (e) {
    ctx.throw(500, e);
  }
};


exports.login = async ctx => {
  const { username, password } = ctx.request.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      ctx.status = 401;
      ctx.body = {
        message: '회원 아이디를 찾을 수 없습니다.',
        id,
      };
      return;
    }
    const check = await user.checkPassword(password);
    if (!check) {
      ctx.status = 401;
      ctx.body = {
        message: '패스워드 불일치',
        password,
      };
      return;
    }

    ctx.body = user.serialize();

    const token = user.generateToken();
    ctx.cookies.set('access_token', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });


  } catch (e) {
    ctx.throw(500, e);
  }
};


exports.logout = async ctx => {
  try {
    ctx.cookies.set('access_token', '');
    ctx.status = 204;
  } catch (e) {
    ctx.throw(500, e);
  }
};


exports.check = async ctx => {

  try {
    const { user } = ctx.state;
    if (!user) {
      ctx.status = 400;
      ctx.body = {
        message: '로그인 상태가 아닙니다.',
      }
      return;
    }
    ctx.status = 204;

  } catch (e) {
    ctx.throw(500, e);
  }
};
