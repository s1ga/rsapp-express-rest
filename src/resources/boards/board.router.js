const router = require('express').Router();
const boardService = require('./board.service');
const { validationBoard } = require('../../utils/validator');
const { validationResult } = require('express-validator');
const SERVER_ERROR = require('../../utils/errorsHandler');

router.get('/', async (req, res, next) => {
  try {
    const boards = await boardService.getAll();

    res.status(200).json(boards.map(i => i.toResponse()));
  } catch (e) {
    return next(e);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const board = await boardService.getById(req.params.id);

    if (!board) {
      throw new SERVER_ERROR({ status: 404, message: 'Board not found' });
    }

    res.status(200).json(board.toResponse());
  } catch (e) {
    return next(e);
  }
});

router.post('/', validationBoard, async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(
      new SERVER_ERROR({ status: 422, message: errors.array()[0].msg })
    );
  }

  try {
    const board = await boardService.create(req.body);

    if (!board) {
      throw new SERVER_ERROR({ status: 400, message: 'Bad request' });
    }

    res.status(200).json(board.toResponse());
  } catch (e) {
    return next(e);
  }
});

router.put('/:id', validationBoard, async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(
      new SERVER_ERROR({ status: 422, message: errors.array()[0].msg })
    );
  }

  try {
    const board = await boardService.update(req.params.id, req.body);

    if (!board) {
      throw new SERVER_ERROR({ status: 400, message: 'Bad request' });
    }

    res.status(200).json(board.toResponse());
  } catch (e) {
    return next(e);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const board = await boardService.deleteById(req.params.id);

    if (!board) {
      throw new SERVER_ERROR({ status: 404, message: 'Board not found' });
    }

    res.status(204).send('The board has been deleted');
  } catch (e) {
    return next(e);
  }
});

module.exports = router;
