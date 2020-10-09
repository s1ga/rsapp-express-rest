const router = require('express').Router();
// const Board = require('../models/board.model');
const boardService = require('../services/board.service');

router.get('/', async (req, res) => {
  try {
    const boards = await boardService.getAll();

    res.status(200).json(boards);
  } catch (e) {
    console.log(e);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const board = await boardService.getById(req.params.id);

    res.status(200).json(board);
  } catch (e) {
    res.status(404).json('Board not found');
    console.log(e);
  }
});

router.post('/', async (req, res) => {
  try {
    const board = await boardService.create(req.body);

    res.status(200).json(board);
  } catch (e) {
    res.status(400).json('Bad request');
    console.log(e);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const board = await boardService.update(req.params.id, req.body);

    res.status(200).json(board);
  } catch (e) {
    res.status(400).json('Bad request');
    console.log(e);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await boardService.deleteById(req.params.id);

    res.status(204).json('The board has been deleted');
  } catch (e) {
    res.status(404).json('Board not found');
    console.log(e);
  }
});

module.exports = router;
