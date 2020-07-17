const Router = require('koa-router');
const ctrl = require('./auth-control');

const router = new Router();


const debugging = async (ctx, next) => {
  const o = {
    method: ctx.method,
    path: ctx.path,
    params: ctx.params || '',
    query: ctx.query || ''
  };

  console.log({ o });
  await next();
}

router.get('/', ctx => {
  ctx.body = '<h1>/v1/auth</h1>';
});

const { register, login, logout, check } = ctrl;


router.post('/register', debugging, register);
router.post('/login', debugging, login);
router.post('/logout', debugging, logout);
router.get('/check', debugging, check);


module.exports = router;


