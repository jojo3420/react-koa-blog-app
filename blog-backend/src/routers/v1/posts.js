const Router = require('koa-router');
const controller = require('./posts.control');
const checkLoggedIn = require('../../lib/checkLoggedIn');


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
  remove, update, validatorObjectId,
  checkIsOwner,
} = controller;

router.get('/', log, list);
router.post('/', log, checkLoggedIn, write);
router.get('/:id', log, checkLoggedIn, validatorObjectId, read);
router.delete('/:id', log, checkLoggedIn, validatorObjectId, checkIsOwner, remove);
router.put('/:id', log, checkLoggedIn, validatorObjectId, checkIsOwner, update);



module.exports = router;
