const router = require('express').Router();
const User = require('../models/user.model');
const usersService = require('../services/user.service');

router.get('/', async (req, res) => {
  const users = await usersService.getAll();
  // map user fields to exclude secret fields like "password"
  res.status(200).json(users.map(User.toResponse));
});

// router.get('/:id', (req, res) => {

// });

// router.post('/', (req, res) => {

// });

// router.put('/:id', (req, res) => {

// });

// router.delete('/:id', (req, res) => {

// });

module.exports = router;
