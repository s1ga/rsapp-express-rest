const uuid = require('uuid');
const { Schema, model } = require('mongoose');

const taskSchema = new Schema({
  _id: {
    type: String,
    default: uuid
  },
  title: {
    type: String,
    required: true
  },
  order: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  userId: {
    // type: Schema.Types.ObjectId,
    // ref: 'User',
    type: String,
    required: true
  },
  boardId: {
    // type: Schema.Types.ObjectId,
    // ref: 'Board',
    type: String,
    required: true
  },
  columnId: {
    // type: Schema.Types.ObjectId,
    // ref: 'Column',
    type: String,
    required: true
  }
});

// class Task {
//   constructor({
//     id = uuid(),
//     title = 'Task title',
//     order = 'task',
//     description = 'New Task',
//     userId = 'null',
//     boardId = 'null',
//     columnId = 'null'
//   } = {}) {
//     this.id = id;
//     this.title = title;
//     this.order = order;
//     this.description = description;
//     this.userId = userId;
//     this.boardId = boardId;
//     this.columnId = columnId;
//   }

//   static fromRequest(body) {
//     return new Task(body);
//   }
// }

module.exports = model('Task', taskSchema);
