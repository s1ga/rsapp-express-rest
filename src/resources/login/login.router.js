const router = require('express').Router();
const loginService = require('./login.service');
const SERVER_ERROR = require('../../utils/errorsHandler');

router.post('/', async (req, res, next) => {
  try {
    const user = await loginService.findUser(req.body.login, req.body.password);

    if (!user) {
      throw new SERVER_ERROR({
        status: 403,
        message: 'Incorrect login or password'
      });
    }

    const token = await loginService.getToken(user);
    if (!token) {
      throw new SERVER_ERROR({
        status: 403,
        message: 'Incorrect login or password'
      });
    }

    res.status(200).json({ token });
  } catch (e) {
    return next(e);
  }
});

module.exports = router;
