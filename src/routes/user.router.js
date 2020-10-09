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
    res.status(404).json('User not found');
  }
});

router.post('/', async (req, res) => {
  try {
    const user = await userService.create(req.body);

    res.status(200).json(User.toResponse(user));
  } catch (e) {
    console.log(e);
    res.status(400).json('User not created');
  }
});

router.put('/:id', async (req, res) => {
  try {
    const user = await userService.update(req.params.id, req.body);

    res.status(200).json(User.toResponse(user));
  } catch (e) {
    console.log(e);
    res.status(400).json('User not changed');
  }
});

router.delete('/:id', async (req, res) => {
  try {
    /* const isDelete =*/ await userService.deleteById(req.params.id);

    res.status(204).json('The user has been deleted');
  } catch (e) {
    console.log(e);
    res.status(404).json('User not found');
  }
});

module.exports = router;
