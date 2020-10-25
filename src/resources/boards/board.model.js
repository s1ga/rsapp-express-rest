const uuid = require('uuid');
const { Schema, model } = require('mongoose');

const boardSchema = new Schema({
  _id: {
    type: String,
    default: uuid
  },
  title: {
    type: String,
    required: true
  },
  columns: [
    {
      _id: {
        type: String,
        default: uuid
      },
      title: String,
      order: Number
    }
  ]
});

boardSchema.statics.toResponse = board => {
  const { id, title, columns } = board;

  return { id, title, columns };
};

module.exports = model('Board', boardSchema);
