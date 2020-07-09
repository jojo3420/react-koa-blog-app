const Router = require('koa-router');
const controller = require('./posts.control');

const router = new Router();


const {
  list, write, read,
  remove, replace, update,
} = controller;

const log = (ctx, next) => {
  const log = {
    method: ctx.method,
    path: ctx.path,
    params: ctx.params,
    body: ctx.request.body ? ctx.request.body : {},
  };
  console.log({ '요청 로그: ': log });
  next();
}

router.get('/', log, list);
router.post('/', log, write);
router.get('/:id', log, read);
router.delete('/:id', log, remove);
router.put('/:id', log, replace);
router.patch('/:id', log, update);



module.exports = router;
