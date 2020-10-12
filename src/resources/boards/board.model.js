const uuid = require('uuid');

class Board {
  constructor({
    id = uuid(),
    title = 'Board',
    columns = [
      {
        id: null,
        title: 'Column',
        order: 0
      }
    ]
  } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns;
  }

  static fromRequest(body) {
    return new Board(body);
  }
}

module.exports = Board;
