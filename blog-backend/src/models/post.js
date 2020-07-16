const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = new Schema({
  title: String,
  body: String,
  tags: [String],

});

const Post = mongoose.model('post', schema);

module.exports = Post;



