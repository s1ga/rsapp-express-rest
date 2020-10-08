const User = require('../models/user.model');

const DB = {
  Users: [new User(), new User()],
  Tasks: [],
  Boards: []
};

module.exports = DB;
