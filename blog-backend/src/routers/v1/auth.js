const Router = require('koa-router');
const controller = require('./auth.control');


const router = new Router();


const { register, login, logout, check  } = controller;

const debugging = async (ctx, next) => {
  const obj = {
    method: ctx.method,
    path: ctx.path,
    params: ctx.params || '',
    // query: ctx.query || '',
    body: ctx.request.body || '',
  }
  console.log(obj);
  await next();
}

router.get('/', debugging, (ctx) => {
  ctx.body = '<h2>/v1/auth</h2>';
})


// Register
// /v1/auth/register
router.post('/register', debugging, register);

// Login
router.post('/login', debugging, login);

// Logout
router.post('/logout', debugging, logout);


// Check Login State
router.get('/check', debugging, check);


module.exports = router;
