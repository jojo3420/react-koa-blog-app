
let postId = 1; // id 초기값

const posts = [
  {
    id: 1,
    title: 'title',
    body: 'body'
  },
];


/**
 * 신규 포스트 등록
 * POST /v1/posts
 * @param ctx
 */
exports.write = ctx => {
  const { title, body } = ctx.request.body;
  const post = { id: ++postId, title, body };
  posts.push(post);
  ctx.body = post;
}

/**
 * 포스트 전체 목록 조회
 * GET /v1/posts
 * @param ctx
 */
exports.list = ctx => {
    ctx.body = posts;
}


/**
 * 특정 포스트 조회
 * GET /v1/posts/:id
 * @param ctx
 */
exports.read = ctx => {
  const { id } = ctx.params;
  const post = posts.find(post => post.id === parseInt(id, 10));
  if (!post) {
    ctx.status = 404;
    ctx.body = {
      message: 'post is not exist.'
    }
    return;
  }
  ctx.body = post;
}

/**
 * 특정 포스트 삭제하기
 * DELTE /v1/posts/:id
 * @param ctx
 */
exports.remove = ctx => {
  const { id } = ctx.params;
  const index = posts.findIndex(p => p.id === parseInt(id));
  if (index > -1) {
    // remove
    posts.splice(index, 1);
    ctx.status = 204; // No Content

  } else {
    ctx.status = 404;
    ctx.body = {
      message: 'post is not exist.'
    }
  }
};

/**
 *  새로운 포스트 로 교체
 *  PUT /v1/posts/:id
 *  request.body: { title, body }
 * @param ctx
 */
exports.replace = ctx => {
  const { id } = ctx.params;
  const { title, body } = ctx.request.body;
  const index = posts.findIndex(post => post.id === parseInt(id, 10));
  if (index > -1) {
    posts[index] = { ...posts[index], title, body };
    ctx.status = 202;
    ctx.body = posts[index];
    return;
  }
  ctx.status = 404;
  ctx.body = {
    message: 'post is not exist!',
  };
};

/**
 * post 일부 수정
 * PATCH /v1/posts/:id
 * { title, body }
 * @param ctx
 */
exports.update = ctx => {
  const { id } = ctx.params;
  const index = posts.findIndex(post => post.id === parseInt(id, 10));
  if (index > -1) {
    const { body } = ctx.request.body;
    posts[index] = { ...posts[index], body };
    ctx.status = 202;
    ctx.body = posts[index];
    return;
  }

  ctx.status = 404;
  ctx.body = {
    message: 'post is not exist!'
  };
}
