const Router = require('koa-router');
const control = require('./posts-control');
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
router.get('/:id', logging, validateObjectId, find);
router.post('/', logging, save);
router.patch('/:id', logging, validateObjectId, update);
router.delete('/:id', logging, validateObjectId, remove);





module.exports = router;

