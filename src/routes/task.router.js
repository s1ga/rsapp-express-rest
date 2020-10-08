const router = require('express').Router();
// const Task = require('../models/task.model');
const taskService = require('../services/task.service');

router.get('/:boardid', async (req, res) => {
  try {
    const tasks = await taskService.getAll(req.params.boardid);

    res.status(200).json(tasks);
  } catch (e) {
    console.log(e);
  }
});

// router.get('/:id', async (req, res) => {

// })

// router.post('/', async (req, res) => {

// })

// router.put('/:id', async (req, res) => {

// })

// router.delete('/:id', async (req, res) => {

// })

module.exports = router;
