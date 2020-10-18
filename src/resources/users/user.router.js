const router = require('express').Router();
const User = require('./user.model');
const userService = require('./user.service');
const { logger } = require('../../utils/logger');

router.get('/', async (req, res) => {
  try {
    const users = await userService.getAll();

    res.status(200).json(users.map(User.toResponse));
  } catch (e) {
    logger.log('error', e.stack);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const user = await userService.getById(req.params.id);
    // throw new Error('user');
    if (user) {
      res.status(200).json(User.toResponse(user));
    } else {
      res.status(404).send('User not found');
    }
  } catch (e) {
    logger.log('error', e.stack);
  }
});

router.post('/', async (req, res) => {
  try {
    const user = await userService.create(req.body);

    if (user) {
      res.status(200).json(User.toResponse(user));
    } else {
      res.status(400).send('User not created');
    }
  } catch (e) {
    logger.log('error', e.stack);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const user = await userService.update(req.params.id, req.body);

    if (user) {
      res.status(200).json(User.toResponse(user));
    } else {
      res.status(400).send('User not changed');
    }
  } catch (e) {
    logger.log('error', e.stack);
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
    logger.log('error', e.stack);
  }
});

module.exports = router;
