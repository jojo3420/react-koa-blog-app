const Koa = require('koa');
const Router = require('koa-router');
const dotEnv = require('dotenv');
const bodyParser = require('koa-bodyparser');
const mongoose = require('mongoose');

const v1Router = require('./v1/index');


dotEnv.config();
const port = process.env.PORT || 4000;

// MongoDB Connect
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,

}).then(() => {
  console.log('mongodb connected..');
}).catch(e => {
  console.error({ e });
})

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


app.use((ctx) => {
  ctx.status = 404;
  ctx.body = {
    message: 'not found!'
  }
})


// listen server
app.listen(port, () => {
  console.log('server is listening ' + port);
});




