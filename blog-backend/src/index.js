const Koa = require('koa');
const Router = require('koa-router');
const dotEnv = require('dotenv');
const bodyParser = require('koa-bodyparser');
const v1Router = require('./v1/index');


dotEnv.config();
const port = process.env.PORT || 4000;


const app = new Koa();
const router = new Router();


// basic router
router.get('/', async (ctx) => {
  ctx.body = '<h1>Koa framework!</h1>';
});


// use library
app.use(bodyParser());
app.use(router.routes());
app.use(router.allowedMethods());

// sub router
router.use('/v1', v1Router.routes());





// listen server
app.listen(port, () => {
  console.log('server is listening ' + port);
});




