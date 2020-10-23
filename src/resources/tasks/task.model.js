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
    type: String
    // required: true
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
    type: String
    // required: true
  }
});

taskSchema.statics.toResponse = task => {
  const { id, title, order, description, userId, boardId, columnId } = task;
  return { id, title, order, description, userId, boardId, columnId };
};

module.exports = model('Task', taskSchema);
