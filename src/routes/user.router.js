const router = require('express').Router();
const User = require('../models/user.model');
const userService = require('../services/user.service');

router.get('/', async (req, res) => {
  try {
    const users = await userService.getAll();
    // map user fields to exclude secret fields like "password"
    res.status(200).json(users.map(User.toResponse));
  } catch (e) {
    console.log(e);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const user = await userService.getById(req.params.id);

    res.status(200).json(User.toResponse(user));
  } catch (e) {
    console.log(e);
    res.status(404).send('User not found');
  }
});

router.post('/', async (req, res) => {
  try {
    const user = await userService.create(req.body);

    res.status(200).json({
      message: 'User created',
      user: User.toResponse(user)
    });
  } catch (e) {
    console.log(e);
    res.status(400).send('User not created');
  }
});

router.put('/:id', async (req, res) => {
  try {
    const user = await userService.update(req.params.id, req.body);

    res.status(200).json({
      message: 'User updated',
      user: User.toResponse(user)
    });
  } catch (e) {
    console.log(e);
    res.status(400).send('User not changed');
  }
});

// router.delete('/:id', (req, res) => {

// })

module.exports = router;
