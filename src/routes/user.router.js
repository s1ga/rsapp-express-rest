const router = require('express').Router();
const User = require('../models/user.model');
const usersService = require('../services/user.service');

router.get('/', async (req, res) => {
  try {
    const users = await usersService.getAll();
    // map user fields to exclude secret fields like "password"
    res.status(200).json(users.map(User.toResponse));
  } catch (e) {
    console.log(e);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const user = await usersService.getById(req.params.id);

    if (user) {
      res.status(200).json(User.toResponse(user));
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (e) {
    console.log(e);
  }
});

// router.post('/', (req, res) => {

// })

// router.put('/:id', (req, res) => {

// })

// router.delete('/:id', (req, res) => {

// })

module.exports = router;
