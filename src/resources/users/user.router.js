const router = require('express').Router();
const User = require('./user.model');
const userService = require('./user.service');

router.get('/', async (req, res, next) => {
  try {
    const users = await userService.getAll();

    res.status(200).json(users.map(i => User.toResponse(i)));
  } catch (e) {
    return next(e);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const user = await userService.getById(req.params.id);

    res.status(200).json(User.toResponse(user));
  } catch (e) {
    return next(e);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const user = await userService.create(req.body);

    res.status(200).json(User.toResponse(user));
  } catch (e) {
    return next(e);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const user = await userService.update(req.params.id, req.body);

    res.status(200).json(User.toResponse(user));
  } catch (e) {
    return next(e);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    await userService.deleteById(req.params.id);

    res.status(204).json('The user has been deleted');
  } catch (e) {
    return next(e);
  }
});

module.exports = router;
