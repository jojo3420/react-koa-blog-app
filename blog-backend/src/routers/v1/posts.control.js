const Post = require('../../models/post');


/**
 * validator request body or params
 * @param ctx
 * @param next
 * @return {Promise<void>}
 */
exports.validator = async (ctx, next) => {
  console.log({ ctx });
  await next();
};

/**
 * 신규 포스트 등록
 * POST /v1/posts
 * @param ctx
 */
exports.write = async ctx => {
  const { title, body, tags } = ctx.request.body;
  try {
    const post = new Post({
      title,
      body,
      tags
    });
    await post.save();
    ctx.status = 200;
    ctx.body = post;

  } catch (e) {
    ctx.throw(500, e);
  }
};

/**
 * 포스트 전체 목록 조회
 * GET /v1/posts
 * @param ctx
 */
exports.list = async (ctx) => {
  const page = parseInt(ctx.request.query.page || '1', 10);
  if (page < 1) {
    ctx.status = 400;
    return;
  }
  try {
    const posts = await Post.find()
      // .order({ _id: -1 })
      // .limit(10)
      // .skip((page - 1 * 10))
      // .lean()
      .exec();
    ctx.body = posts;

  } catch (e) {
    ctx.throw(500, e);
  }
};


/**
 * 특정 포스트 조회
 * GET /v1/posts/:id
 * @param ctx
 */
exports.read = async ctx => {
  const { id } = ctx.params;
  const post = await Post.findById(id).exec();
  ctx.body = post;
  try {

  } catch (e) {
    ctx.throw(500, e);
  }
};

/**
 * 특정 포스트 삭제하기
 * DELTE /v1/posts/:id
 * @param ctx
 */
exports.remove = async ctx => {
  const { id } = ctx.params;
  try {
    await Post.findByIdAndRemove(id).exec();
    ctx.status = 204;
  } catch (e) {
    ctx.throw(500, e);
  }
};


/**
 * post 수정 하기
 * PATCH /v1/posts/:id
 * { title, body }
 * @param ctx
 */
exports.update = async ctx => {
  const { id } = ctx.params;
  const { title, body, tags } = ctx.request.body;
  try {
    const post = await Post.findByIdAndUpdate(id, { title, body, tags }, {
      new: true,
    });
    ctx.body = post;
  } catch (e) {
    ctx.throw(500, e);
  }
};
