const Router = require('koa-router');
const postsRouter = require('./posts.js');
const authRouter = require('./auth.js');

const router = new Router();

router.get('/', ctx => {
  ctx.body = '<h1>api v1</h1>';
});




router.use('/posts', postsRouter.routes());
router.use('/auth', authRouter.routes());


module.exports = router;
