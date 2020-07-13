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
});

const Post = mongoose.model('Post', schema);

module.exports = Post;
