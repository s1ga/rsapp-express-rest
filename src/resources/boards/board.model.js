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
      id: {
        type: Schema.Types.ObjectId,
        ref: 'Tasks'
      },
      title: {
        type: Schema.Types.String,
        ref: 'Tasks'
      },
      order: {
        type: Schema.Types.Number,
        ref: 'Tasks'
      }
    }
  ]
});

boardSchema.statics.toResponse = board => {
  const { id, title, columns } = board;
  return { id, title, columns };
};

// class Board {
//   constructor({
//     id = uuid(),
//     title = 'Board',
//     columns = [
//       {
//         id: null,
//         title: 'Column',
//         order: 0
//       }
//     ]
//   } = {}) {
//     this.id = id;
//     this.title = title;
//     this.columns = columns;
//   }

//   static fromRequest(body) {
//     return new Board(body);
//   }
// }

module.exports = model('Board', boardSchema);
