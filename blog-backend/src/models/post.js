const mongoose = require('mongoose');

const { Schema } = mongoose;

const schema = new Schema({
  title: String,
  body: String,
  tags: [String],
  publishDate: {
    type: Date,
    default: Date.now
  },
  // user 정보 추가
  user: {
    _id: mongoose.Types.ObjectId,
    username: String,
  }

});

const Post = mongoose.model('Post', schema);

module.exports = Post;
