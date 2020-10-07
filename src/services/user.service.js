const usersRepo = require('../repository/user.memory.repository');

const getAll = () => usersRepo.getAll();

// const getById = id => {
// //   const user = usersRepo.getById(id);
// };

module.exports = { getAll };
