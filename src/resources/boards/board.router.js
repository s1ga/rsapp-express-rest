const router = require('express').Router();
const boardService = require('./board.service');
const { validationBoard } = require('../../utils/validator');
const { validationResult } = require('express-validator');
const Board = require('./board.model');
const SERVER_ERROR = require('../../utils/errorsHandler');

router.get('/', async (req, res, next) => {
  try {
    const boards = await boardService.getAll();

    res.status(200).json(boards.map(i => Board.toResponse(i)));
  } catch (e) {
    return next(e);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const board = await boardService.getById(req.params.id);

    res.status(200).json(Board.toResponse(board));
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

    res.status(200).json(Board.toResponse(board));
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

    res.status(200).json(Board.toResponse(board));
  } catch (e) {
    return next(e);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    await boardService.deleteById(req.params.id);

    res.status(204).send('The board has been deleted');
  } catch (e) {
    return next(e);
  }
});

module.exports = router;
