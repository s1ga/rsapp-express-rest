const router = require('express').Router();
const User = require('./user.model');
const userService = require('./user.service');
const { validationUser } = require('../../utils/validator');
const { validationResult } = require('express-validator');
const SERVER_ERROR = require('../../utils/errorsHandler');

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

    if (!user) {
      throw new SERVER_ERROR({ status: 404, message: 'User not found' });
    }

    res.status(200).json(User.toResponse(user));
  } catch (e) {
    return next(e);
  }
});

router.post('/', validationUser, async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(
      new SERVER_ERROR({ status: 422, message: errors.array()[0].msg })
    );
  }

  try {
    const user = await userService.create(req.body);

    if (!user) {
      throw new SERVER_ERROR({ status: 400, message: 'Bad request' });
    }

    res.status(200).json(User.toResponse(user));
  } catch (e) {
    return next(e);
  }
});

router.put('/:id', validationUser, async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(
      new SERVER_ERROR({ status: 422, message: errors.array()[0].msg })
    );
  }

  try {
    const user = await userService.update(req.params.id, req.body);
    console.log(user);
    if (!user) {
      throw new SERVER_ERROR({ status: 400, message: 'Bad request' });
    }

    res.status(200).json(User.toResponse(user));
  } catch (e) {
    return next(e);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const user = await userService.deleteById(req.params.id);

    if (!user) {
      throw new SERVER_ERROR({ status: 404, message: 'User not found' });
    }

    res.status(204).json('The user has been deleted');
  } catch (e) {
    return next(e);
  }
});

module.exports = router;
