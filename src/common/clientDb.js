// const Task = require('../resources/tasks/task.model');
// const Board = require('../resources/boards/board.model');
const User = require('../resources/users/user.model');
const { logger } = require('../utils/logger');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { MONGO_CONNECTION_STRING } = require('./config');

// const DB = {
//   Users: [new User()],
//   Boards: [new Board()],
//   Tasks: [new Task()]
// };

const createAdminUser = async () => {
  try {
    const password = await bcrypt.hash('admin', 11);

    User.create({ login: 'admin', password });
  } catch (e) {
    logger.error(e);
  }
};

const connectToDB = cb => {
  mongoose.connect(MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  });
  mongoose.set('useCreateIndex', true);

  const db = mongoose.connection;
  db.on('error', logger.error.bind(logger, 'Connection error'));
  db.once('open', () => {
    logger.log('info', 'MongoDB connected');
    db.dropDatabase();
    createAdminUser();
    cb();
  });
};

module.exports = connectToDB;
