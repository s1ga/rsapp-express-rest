// const User = require('../resources/users/user.model');
// const Task = require('../resources/tasks/task.model');
// const Board = require('../resources/boards/board.model');
const { logger } = require('../utils/logger');
const mongoose = require('mongoose');
const { MONGO_CONNECTION_STRING } = require('./config');

// const DB = {
//   Users: [new User()],
//   Boards: [new Board()],
//   Tasks: [new Task()]
// };

const connectToDB = cb => {
  mongoose.connect(MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  });

  const db = mongoose.connection;
  db.on('error', logger.error.bind(logger, 'Connection error'));
  db.once('open', () => {
    logger.log('info', 'MongoDB connected');
    db.dropDatabase();
    cb();
  });
};

module.exports = connectToDB;
