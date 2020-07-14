const Router = require('koa-router');
const controller = require('./posts.control');

const router = new Router();



const log = async (ctx, next) => {
  const log = {
    method: ctx.method,
    path: ctx.path,
    params: ctx.params,
    body: ctx.request.body ? ctx.request.body : {},
  };
  console.log({ '요청 로그: ': log });
  await next();
}

const {
  list, write, read,
  remove, update, validatorObjectId
} = controller;

router.get('/', log, list);
router.post('/', log, write);
router.get('/:id', log, validatorObjectId,  read);
router.delete('/:id', log, validatorObjectId, remove);
router.put('/:id', log, validatorObjectId, update);



module.exports = router;
