const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const { Schema } = mongoose;

const schema = new Schema({
  username: String,
  hashedPassword: String
});


schema.methods.setPassword = async function(password) {
  if (!password) {
    throw new Error('password is empty..');
  }
  const hash = await bcrypt.hash(password, 10);
  // console.log({ hash });
  if (!hash) {
    throw new Error('set Password - hash is empty..');
  }
  this.hashedPassword = hash;
}

schema.methods.checkPassword = async function(password) {
  if (!password) {
    throw new Error('password is empty..');
  }
  const result = await bcrypt.compare(password, this.hashedPassword);
  return result; //true or false
};

schema.methods.serialize = async function() {
  const user = this.toJSON();
  delete user.hashedPassword;
  return user;
};

schema.statics.findByUsername = async function(username) {
  const user = this.findOne({ username });
  if (!user) {
    console.error('user is empty..');
    return null;
  }
  return user;
};

const User = mongoose.model('User', schema);


module.exports = User;
