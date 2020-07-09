const Router = require('koa-router');
const postsRouter = require('./posts');

const router = new Router();

router.get('/', ctx => {
  ctx.body = 'v1 test 성공';
});



router.use('/posts', postsRouter.routes());


module.exports = router;
