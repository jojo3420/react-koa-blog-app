const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const dotEnv = require('dotenv');
const mongoose = require('mongoose');
dotEnv.config();


//
const jwtMiddleware = require('./lib/jwtMiddleware');
const v1Router = require('./routers/v1/index');


const app = new Koa();
const router = new Router();
const port = process.env.PORT || 4000;

// DB connect
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
}).then(() => {
  // createFakeData();
  console.log('connected to MongoDB');
}).catch(e => {
  console.error('db is not connected and exception: ', e);
});


// default router
router.get('/', ctx => {
  ctx.body = "Home";
});


// library use -
router.use(bodyParser());
router.use(jwtMiddleware);


//module router
router.use('/v1', v1Router.routes());



// use root router
app.use(router.routes());
app.use(router.allowedMethods());



// Page NOT FOUND
app.use(ctx => {
  ctx.status = 404;
  ctx.body = {
    error: 'PAGE_NOT_FOUND',
  }
});

app.listen(port, () => {
  console.log('server is listening port: ' + port);
})
