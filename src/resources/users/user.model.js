const uuid = require('uuid');
const { Schema, model } = require('mongoose');

const userSchema = new Schema(
  {
    _id: {
      type: String,
      default: uuid()
    },
    name: {
      type: String
    },
    login: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    }
  },
  { versionKey: false }
);

userSchema.statics.toResponse = user => {
  const { id, name, login } = user;
  return { id, name, login };
};

// class User {
//   constructor({
//     id = uuid(),
//     name = 'USER',
//     login = 'user',
//     password = 'P@55w0rd'
//   } = {}) {
//     this.id = id;
//     this.name = name;
//     this.login = login;
//     this.password = password;
//   }

//   static toResponse(user) {
//     const { id, name, login } = user;
//     return { id, name, login };
//   }

//   static fromRequest(body) {
//     return new User(body);
//   }
// }

module.exports = model('User', userSchema); // User;
