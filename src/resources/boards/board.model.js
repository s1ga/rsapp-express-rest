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
        // type: Schema.Types.ObjectId,
        // ref: 'Tasks'
      },
      title: {
        type: String
        // type: Schema.Types.String,
        // ref: 'Tasks'
      },
      order: {
        type: Number
        // type: Schema.Types.Number,
        // ref: 'Tasks'
      }
    }
  ]
});

boardSchema.statics.toResponse = board => {
  const { id, title, columns } = board;

  return { id, title, columns };
};

module.exports = model('Board', boardSchema);
