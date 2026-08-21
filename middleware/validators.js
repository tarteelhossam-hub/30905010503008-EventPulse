const { body, param } = require('express-validator');

exports.registerValidation = [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Must be a valid email address'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
];

exports.loginValidation = [
  body('email').isEmail().withMessage('Must be a valid email address'),
  body('password').notEmpty().withMessage('Password is required')
];

exports.createEventValidation = [
  body('title').notEmpty().withMessage('Title is required'),
  body('category').isMongoId().withMessage('Invalid Category ID format'),
  body('date').isISO8601().withMessage('Must be a valid date format'),
  body('capacity').isInt({ gt: 0 }).withMessage('Capacity must be a positive integer')
];

exports.updateEventValidation = [
  param('id').isMongoId().withMessage('Invalid Event ID format'),
  body('title').optional().notEmpty().withMessage('Title cannot be empty'),
  body('category').optional().isMongoId().withMessage('Invalid Category ID format'),
  body('date').optional().isISO8601().withMessage('Must be a valid date format'),
  body('capacity').optional().isInt({ gt: 0 }).withMessage('Capacity must be a positive integer')
];

exports.registrationValidation = [
  body('event').isMongoId().withMessage('Invalid Event ID format')
];