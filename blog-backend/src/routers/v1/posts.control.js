const Post = require('../../models/post');
const Joi = require('joi');
const mongoose = require('mongoose');


exports.validatorObjectId = async (ctx, next) => {
  const { id } = ctx.params;
  const { ObjectId } = mongoose.Types;
  const valid = ObjectId.isValid(id);
  if (!valid) {
    ctx.status = 400;
    ctx.body = {
      exception: 'validatorError',
      message: 'id is not mongo db objectId',
      id
    };
    return;
  }
  // return next();
  await next();
};

/**
 * 신규 포스트 등록
 * POST /v1/posts
 * @param ctx
 */
exports.write = async ctx => {
  const schema = Joi.object().keys({
    title: Joi.string().required(), // 필수
    body: Joi.string().required(),
    tags: Joi.array().items(Joi.string()).required() // 문자열로 이루어진 배열
  });

  const result = Joi.validate(ctx.request.body, schema);
  if (result.error) {
    ctx.status = 400;
    ctx.body = result.error;
    return;
  }

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
      .sort({ _id: -1 })
      .limit(10)
      .skip((page - 1) * 10)
      .lean()
      .exec();
    const totalPostCnt = await Post.countDocuments().exec();
    ctx.set('Last-Page', Math.ceil(totalPostCnt / 10));
    // ctx.body = posts;
    ctx.body = posts.map(post => ({
      ...post,
      body: post.body.length < 200 ? post.body : `${post.body.slice(0, 200)} ...`,
    }));
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
  try {
    const post = await Post.findById(id).exec();
    if (!post) {
      ctx.status = 404;
      return;
    }
    ctx.body = post;
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
    const post = await Post.findByIdAndRemove(id).exec();
    if (!post) {
      ctx.status = 404;
      ctx.body = {
        error: 'NOT_FOUND',
        message: 'remove is not working. post is not found.',
        id
      };
      return;
    }
    ctx.status = 204; // 204 이면 response.body 는 비어 있는다.
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


  const schema = Joi.object().keys({
    title: Joi.string(),
    body: Joi.string(),
    tags: Joi.array().items(Joi.string())
  });
  const result = Joi.validate(ctx.request.body, schema);
  if (result.error) {
    ctx.status = 400;
    ctx.body = result.error;
    return;
  }
  const { id } = ctx.params;
  const { title, body, tags } = ctx.request.body;
  try {
    const post = await Post.findByIdAndUpdate(id, { title, body, tags }, {
      new: true
    }).exec();
    if (!post) {
      ctx.status = 404;
      ctx.body = {
        exception: 'not Found',
        message: 'post is not found.',
        id
      };
      return;
    }
    ctx.body = post;
  } catch (e) {
    ctx.throw(500, e);
  }
};
