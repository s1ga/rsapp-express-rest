const uuid = require('uuid');

class Task {
  constructor({
    id = uuid(),
    title = 'Task title',
    order = 'task',
    description = 'New Task',
    userId = null, // usersDB[0].id,
    boardId = null, // DB.Boards[0].id,
    columnId = null // DB.Boards[0].columns[0].id
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
