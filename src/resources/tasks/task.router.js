const router = require('express').Router({ mergeParams: true });
const taskService = require('./task.service');

router.get('/', async (req, res, next) => {
  try {
    const tasks = await taskService.getAll(req.params.boardid);

    res.status(200).json(tasks);
  } catch (e) {
    return next(e);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const task = await taskService.getById(req.params.boardid, req.params.id);

    res.status(200).json(task);
  } catch (e) {
    return next(e);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const task = await taskService.create(req.params.boardid, req.body);

    res.status(200).json(task);
  } catch (e) {
    return next(e);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const task = await taskService.update(
      req.params.boardid,
      req.params.id,
      req.body
    );

    res.status(200).json(task);
  } catch (e) {
    return next(e);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    await taskService.deleteById(req.params.boardid, req.params.id);

    res.status(204).send('The task has been deleted');
  } catch (e) {
    return next(e);
  }
});

module.exports = router;
