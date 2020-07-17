const Router = require('koa-router');
const control = require('./posts-control');
const isOwnerCheckMiddleware = require('../lib/isOwnerCheckMiddleware');

const router = new Router();


const logging = async (ctx, next) => {
  console.log({
    url: ctx.url,
    method: ctx.method,
    params: ctx.params,
    body: ctx.request.body || {}
  });
  await next();
};

const {
  save, list ,find, update, remove,
  validateObjectId,

} = control;


router.get('/', logging, list);
router.post('/', logging, save);
router.get('/:id', logging, validateObjectId, find);
router.patch('/:id', logging, validateObjectId, isOwnerCheckMiddleware, update);
router.delete('/:id', logging, validateObjectId, isOwnerCheckMiddleware, remove);





module.exports = router;

