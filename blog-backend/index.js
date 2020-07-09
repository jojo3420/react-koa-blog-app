const Koa = require('koa');
// const router = require('koa-router');
const dotEnv = require('dotenv');


const app = new Koa();
dotEnv.config();


const port = process.env.PORT || 4000;


app.use(async (ctx) => {
  ctx.body = '<h1>Koa framework!!!</h1>';
});





app.listen(port, () => {
  console.log('server is listening ' + port);
});




