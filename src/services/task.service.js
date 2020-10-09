const taskRepo = require('../repository/task.memory.repository');

const getAll = id => taskRepo.getAll(id);
const getById = id => taskRepo.getById(id);
const create = body => taskRepo.create(body);
const update = (id, body) => taskRepo.update(id, body);

module.exports = { getAll, getById, create, update };
