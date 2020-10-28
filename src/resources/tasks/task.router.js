const router = require('express').Router({ mergeParams: true });
const taskService = require('./task.service');
const SERVER_ERROR = require('../../utils/errorsHandler');
const { validationResult } = require('express-validator');
const { validationTask } = require('../../utils/validator');
const auth = require('../../utils/auth');

router.get('/', auth, async (req, res, next) => {
  try {
    const tasks = await taskService.getAll(req.params.boardid);

    res.status(200).json(tasks.map(i => i.toResponse()));
  } catch (e) {
    return next(e);
  }
});

router.get('/:id', auth, async (req, res, next) => {
  try {
    const task = await taskService.getById(req.params.boardid, req.params.id);

    if (!task) {
      throw new SERVER_ERROR({ status: 404, message: 'Task not found' });
    }

    res.status(200).json(task.toResponse());
  } catch (e) {
    return next(e);
  }
});

router.post('/', auth, validationTask, async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(
      new SERVER_ERROR({ status: 422, message: errors.array()[0].msg })
    );
  }

  try {
    const task = await taskService.create(req.params.boardid, req.body);

    if (!task) {
      throw new SERVER_ERROR({ status: 400, message: 'Bad request' });
    }

    res.status(200).json(task.toResponse());
  } catch (e) {
    return next(e);
  }
});

router.put('/:id', auth, validationTask, async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(
      new SERVER_ERROR({ status: 422, message: errors.array()[0].msg })
    );
  }

  try {
    const task = await taskService.update(
      req.params.boardid,
      req.params.id,
      req.body
    );

    if (!task) {
      throw new SERVER_ERROR({ status: 400, message: 'Bad request' });
    }

    res.status(200).json(task.toResponse());
  } catch (e) {
    return next(e);
  }
});

router.delete('/:id', auth, async (req, res, next) => {
  try {
    const task = await taskService.deleteById(
      req.params.boardid,
      req.params.id
    );

    if (!task) {
      throw new SERVER_ERROR({ status: 404, message: 'Task not found' });
    }

    res.status(204).send('The task has been deleted');
  } catch (e) {
    return next(e);
  }
});

module.exports = router;
