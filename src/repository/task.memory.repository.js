const DB = require('../common/inMemoryDB');
const tasksDB = DB.Tasks;

const getAll = async id => {
  const tasks = tasksDB.filter(i => i.boardId === id);

  return tasks;
};

module.exports = { getAll };
