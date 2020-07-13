const Router = require('koa-router');
const postsRouter = require('./posts');
const router = new Router();

// /v1
router.get('/', async (ctx) => {
  ctx.body = '<h1>v1 router</h1>';
});

// /v1/posts
router.use('/posts', postsRouter.routes());

module.exports = router;


