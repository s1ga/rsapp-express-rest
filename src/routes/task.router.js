const router = require('express').Router({ mergeParams: true });
// const Task = require('../models/task.model');
const taskService = require('../services/task.service');

router.get('/', async (req, res) => {
  try {
    const tasks = await taskService.getAll(req.params.boardid);

    res.status(200).json(tasks);
  } catch (e) {
    console.log(e);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const task = await taskService.getById(req.params.boardid, req.params.id);
    if (task) {
      res.status(200).json(task);
    } else {
      res.status(404).send('Not found');
    }
  } catch (e) {
    console.log(e);
  }
});

router.post('/', async (req, res) => {
  try {
    const task = await taskService.create(req.params.boardid, req.body);

    if (task) {
      res.status(200).json(task);
    } else {
      res.status(400).send('Bad request');
    }
  } catch (e) {
    console.log(e);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const task = await taskService.update(
      req.params.boardid,
      req.params.id,
      req.body
    );

    if (task) {
      res.status(200).json(task);
    } else if (task === null) {
      res.status(404).send('Task not found');
    } else {
      res.status(400).send('Bad request');
    }
  } catch (e) {
    console.log(e);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const task = await taskService.deleteById(
      req.params.boardid,
      req.params.id
    );

    if (task) {
      res.status(204).send('The task has been deleted');
    } else {
      res.status(404).send('Task not found');
    }
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
