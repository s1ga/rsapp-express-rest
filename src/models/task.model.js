const uuid = require('uuid');
const DB = require('../common/inMemoryDB');

class Task {
  constructor({
    id = uuid(),
    title = 'Task title',
    order = 'task',
    description = 'New Task',
    userId = DB.Users[0].id,
    boardId = DB.Boards[0].id,
    columnId = DB.Boards.columns[0].id
  } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
  }

  //   static toResponse(user) {
  //     const { id, name, login } = user;
  //     return { id, name, login };
  //   }

  static fromRequest(body) {
    return new Task(body);
  }
}

module.exports = Task;
