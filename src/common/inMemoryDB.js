const User = require('../resources/users/user.model');
const Task = require('../resources/tasks/task.model');
const Board = require('../resources/boards/board.model');

const DB = {
  Users: [new User()],
  Boards: [new Board()],
  Tasks: [new Task()]
};

module.exports = DB;
