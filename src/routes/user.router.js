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

    if (user) {
      res.status(200).json(User.toResponse(user));
    } else {
      res.status(404).send('User not found');
    }
  } catch (e) {
    console.log(e);
  }
});

router.post('/', async (req, res) => {
  try {
    const user = await userService.create(req.body);

    res.status(200).json(User.toResponse(user));
  } catch (e) {
    console.log(e);
    res.status(400).send('User not created');
  }
});

router.put('/:id', async (req, res) => {
  try {
    const user = await userService.update(req.params.id, req.body);

    res.status(200).json(User.toResponse(user));
  } catch (e) {
    console.log(e);
    res.status(400).send('User not changed');
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const isDelete = await userService.deleteById(req.params.id);

    if (isDelete) {
      res.status(204).json('The user has been deleted');
    } else {
      res.status(404).send('User not found');
    }
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
