const router = require('express').Router();
const boardService = require('./board.service');
const { logger } = require('../../utils/logger');

router.get('/', async (req, res) => {
  try {
    const boards = await boardService.getAll();

    res.status(200).json(boards);
  } catch (e) {
    logger.log('error', e.stack);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const board = await boardService.getById(req.params.id);

    if (board) {
      res.status(200).json(board);
    } else {
      res.status(404).send('Board not found');
    }
  } catch (e) {
    logger.log('error', e.stack);
  }
});

router.post('/', async (req, res) => {
  try {
    const board = await boardService.create(req.body);

    if (board) {
      res.status(200).json(board);
    } else {
      res.status(400).send('Bad request');
    }
  } catch (e) {
    logger.log('error', e.stack);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const board = await boardService.update(req.params.id, req.body);

    if (board) {
      res.status(200).json(board);
    } else {
      res.status(400).send('Bad request');
    }
  } catch (e) {
    logger.log('error', e.stack);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const isDelete = await boardService.deleteById(req.params.id);

    if (isDelete) {
      res.status(204).send('The board has been deleted');
    } else {
      res.status(404).send('Board not found');
    }
  } catch (e) {
    logger.log('error', e.stack);
  }
});

module.exports = router;
