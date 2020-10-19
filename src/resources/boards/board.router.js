const router = require('express').Router();
const boardService = require('./board.service');

router.get('/', async (req, res, next) => {
  try {
    const boards = await boardService.getAll();

    res.status(200).json(boards);
  } catch (e) {
    return next(e);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const board = await boardService.getById(req.params.id);

    res.status(200).json(board);
  } catch (e) {
    return next(e);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const board = await boardService.create(req.body);

    res.status(200).json(board);
  } catch (e) {
    return next(e);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const board = await boardService.update(req.params.id, req.body);

    res.status(200).json(board);
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
