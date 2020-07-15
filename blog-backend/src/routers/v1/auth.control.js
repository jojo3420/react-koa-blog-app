const User = require('../..//models/user');
const Joi = require('joi');
/**
 * Register User
 * /v1/auth/register
 * @param ctx
 * @return {Promise<void>}
 */
exports.register = async ctx => {
  const schema = Joi.object().keys({
    username: Joi.string()
      .alphanum()
      .min(3)
      .max(20)
      .required(),
    password: Joi.string().required()
  });
  const result = Joi.validate(ctx.request.body, schema);
  if (result.error) {
    ctx.status = 400;
    ctx.body = result.error;
    return;
  }

  const { username, password } = ctx.request.body;
  try {
    // check duplicate
    const exists = await User.findByUsername(username);
    if (exists) {
      ctx.status = 400;
      ctx.body = {
        message: 'duplicate username',
        username,
      };
      return;
    }
  }  catch (e) {
    ctx.throw(500, e);
  }
  try {
    const newUser = new User({ username });
    await newUser.setPassword(password);
    await newUser.save();
    ctx.body = await newUser.serialize();
  } catch (e) {
    ctx.throw(500, e);
  }

};

/**
 * Login
 * /v1/auth/login
 * @param ctx
 * @return {Promise<void>}
 */
exports.login = async ctx => {
 const { username, password } = ctx.request.body;
 if (!username || !password) {
   ctx.status = 401;
   ctx.body = {
     message: 'username or password is empty..',
   }
   return;
 }

 try {
   const user = await User.findByUsername(username);
   if (!user) {
     ctx.status = 404;
     ctx.body = {
       message: 'user can\'t find! ',
       error: 'NOT_FOUND',
     };
     return;
   }

   const valid = await user.checkPassword(password);
   if (!valid) {
     ctx.status = 400;
     ctx.body = {
       error: 'NOT_CORRECT',
       message: 'password is not correct!'
     }
     return;
   }

   const json = user.toJSON();
   delete json.hashedPassword;
   ctx.body = json;

 } catch (e) {
   ctx.throw(500, e);
 }
};


/**
 * log out
 * /v1/auth/logout
 * @param ctx
 * @return {Promise<void>}
 */
exports.logout = async ctx => {
  const { username } = ctx.request.params;
  try {


  } catch (e) {
    ctx.throw(500, e);
  }
};



exports.check = async ctx => {

};

