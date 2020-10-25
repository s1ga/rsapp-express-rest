const uuid = require('uuid');
const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  _id: {
    type: String,
    default: uuid
  },
  name: {
    type: String,
    required: true
  },
  login: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

userSchema.statics.toResponse = user => {
  const { id, name, login } = user;
  return { id, name, login };
};

module.exports = model('User', userSchema);
