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

taskSchema.statics.toResponse = task => {
  const { id, title, order, description, userId, boardId, columnId } = task;
  return { id, title, order, description, userId, boardId, columnId };
};

// taskSchema.methods.pushToBoard = async function() {
//   const board = await Board.findById(this.boardId);
//   const { id: _id, title, order } = this;

//   board.columns.push({ id: _id, title, order });

//   await board.save();
//   return this;
// };

module.exports = model('Task', taskSchema);
