const User = require('../models/user.model');
// const Task = require('../models/task.model');
const Board = require('../models/board.model');

const DB = {
  Users: [new User(), new User()],
  Boards: [new Board(), new Board()],
  Tasks: []
};

module.exports = DB;
