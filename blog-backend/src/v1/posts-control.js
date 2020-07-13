

let postId = 1;
const posts = [
  {id: 1, title: 'basic', body: 'good' },
]

// save post
exports.save = ctx => {
  const { title, body } = ctx.request.body;
  if (title && body) {
    posts.push({
      id: ++postId,
      title,
      body
    });
    ctx.status = 201; // created
    return;
  }

  ctx.status = 404;
  ctx.body = {
    message: '포스트 등록 실패',
  };
};

exports.list = ctx => {
  ctx.body = posts;
};

exports.find = ctx => {
  const { id } = ctx.params;
  const post = posts.find(p => p.id === parseInt(id, 10));
  if (post) {
    ctx.body = post;
    return;
  }
  ctx.status = 404;
  ctx.body = {
    message: 'post is not exist.'
  };
};

exports.replace = ctx => {
  const { id } = ctx.params;
  const index = posts.findIndex(p => p.id === parseInt(id, 10));
  if (index > -1) {
    posts[index] = { ...posts[index], ...ctx.request.body };
    ctx.body = posts[index];
    return;
  }
  ctx.status = 404;
  ctx.body = {
    message: 'post is not exist.'
  };
};

exports.update = ctx => {
  const { id } = ctx.params;
  const index = posts.findIndex(p => p.id === parseInt(id, 10));
  if (index > -1) {
    const { body } = ctx.request.body;
    posts[index].body = body;
    ctx.body = posts[index];
    return;
  }
};

exports.remove = ctx => {
  const { id } = ctx.params;
  const index = posts.findIndex(p => p.id === parseInt(id, 10));
  if (index > -1) {
    posts.splice(index, 1);
    ctx.status = 204;
    return;
  }

  ctx.status = 404;
  ctx.body = {
    message: 'post is not exist.'
  };

};
