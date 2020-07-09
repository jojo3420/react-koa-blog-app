const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');


const app = new Koa();
const router = new Router();

const v1Router = require('./routers/v1/index');

router.get('/', ctx => {
  ctx.body = "Home";
});


// library use -
router.use(bodyParser());


// use root router
app.use(router.routes());
app.use(router.allowedMethods());


//module router
router.use('/v1', v1Router.routes());



app.listen(4000, () => {
  console.log('server is listening port: ' + 4000);
})
