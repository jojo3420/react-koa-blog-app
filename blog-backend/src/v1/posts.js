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
  next();
};

const { save, list ,find, replace, update, remove } = control;


router.get('/', logging, list);
router.get('/:id', logging, find);
router.post('/', logging, save);
router.put('/:id', logging, replace);
router.patch('/:id', logging, update);
router.delete('/:id', logging, remove);





module.exports = router;

