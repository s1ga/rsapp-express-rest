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

boardSchema.method('toResponse', function toResponse() {
  const { id, title } = this;
  let { columns } = this;
  columns = columns.toObject();

  // for (let i = 0; i < columns.length; i++) {
  //   columns[i].id = columns[i]._id;
  //   delete columns[i]._id;
  // }

  return { id, title, columns };
});

module.exports = model('Board', boardSchema);
