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
    type: String
  },
  userId: {
    type: String
  },
  boardId: {
    type: String,
    required: true
  },
  columnId: {
    type: String
  }
});

taskSchema.method('toResponse', function toResponse() {
  const { id, title, order, description, userId, boardId, columnId } = this;
  return { id, title, order, description, userId, boardId, columnId };
});

module.exports = model('Task', taskSchema);
