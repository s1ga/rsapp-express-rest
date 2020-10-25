const { body } = require('express-validator');

exports.validationUser = [
  body('login')
    .isLength(3)
    .withMessage('Login should be minimum 3 character')
    .trim(),
  body('name')
    .isLength(3)
    .withMessage('Name should be minimum 3 character')
    .trim(),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password should be minimum 6 character')
    .trim()
];

exports.validationBoard = [
  body('title')
    .isLength(3)
    .withMessage('Board title should be minimum 3 character'),
  body('columns.title')
    .isLength(3)
    .withMessage('Column title should be minimum 3 character'),
  body('columns.order')
    .isNumeric()
    .withMessage('Order should be a number')
];

exports.validationTask = [
  body('order')
    .isNumeric()
    .withMessage('Order should be a number')
];
