const { body, validationResult } = require('express-validator');

const checkValidations = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((err) => {
            return err.msg;
        });

        const message = errorMessages.join('. ');

        return res.status(400).json({
            status: 'error',
            message: message,
        });
    }

    next();
};

const createUserValidator = [
    body('name')
        .isString()
        .withMessage('Name must be a string')
        .notEmpty()
        .withMessage('Name cannot be empty')
        .isLength({ min: 3 })
        .withMessage('Name must be a least 3 characters'),
    body('email').isEmail().withMessage('Must provide a valid email'),
    body('password')
        .isString()
        .withMessage('Password must be a string')
        .notEmpty()
        .withMessage('Password cannot be empty')
        .isLength({ min: 8 })
        .withMessage('Password must be a least 8 characters'),
    checkValidations,
];

const loginValidator = [
    body('email').isEmail().withMessage('Must provide a valid email'),
    body('password')
        .isString()
        .withMessage('Password must be a string')
        .notEmpty()
        .withMessage('Password cannot be empty')
        .isLength({ min: 8 })
        .withMessage('Password must be a least 8 characters'),
    checkValidations,
];

const updateUserValidator = [
    body('name')
        .isString()
        .withMessage('Name must be a string')
        .notEmpty()
        .withMessage('Name cannot be empty')
        .isLength({ min: 3 })
        .withMessage('Name must be a least 3 characters'),
    body('email').isEmail().withMessage('Must provide a valid email'),
    checkValidations,
];

const createRestaurantValidator = [
    body('name')
        .isString()
        .withMessage('Name must be a string')
        .notEmpty()
        .withMessage('Name cannot be empty')
        .isLength({ min: 1 })
        .withMessage('Name must be a least 1 characters'),
    body('address')
        .isString()
        .withMessage('Address must be a string')
        .notEmpty()
        .withMessage('Address cannot be empty'),
    body('rating')
        .isInt({ min: 1, max: 5, allow_leading_zeroes: false })
        .withMessage(
            'Rating must be a number between 1 - 5 that does not contain 0 to the left'
        )
        .notEmpty()
        .withMessage('Rating cannot be empty'),
    checkValidations,
];

const updateRestaurantValidator = [
    body('name')
        .isString()
        .withMessage('Name must be a string')
        .notEmpty()
        .withMessage('Name cannot be empty')
        .isLength({ min: 1 })
        .withMessage('Name must be a least 1 characters'),
    body('address')
        .isString()
        .withMessage('Address must be a string')
        .notEmpty()
        .withMessage('Address cannot be empty'),
    checkValidations,
];

const reviewValidator = [
    body('comment')
        .isString()
        .withMessage('Comment must be a string')
        .notEmpty()
        .withMessage('Comment cannot be empty'),
    body('rating')
        .isInt({ min: 1, max: 5, allow_leading_zeroes: false })
        .withMessage(
            'Rating must be a number between 1 - 5 that does not contain 0 to the left'
        )
        .notEmpty()
        .withMessage('Rating cannot be empty'),
    checkValidations,
];

const mealValidator = [
    body('name')
        .isString()
        .withMessage('Name must be a string')
        .notEmpty()
        .withMessage('Name cannot be empty'),
    body('price')
        .isInt({ min: 1, allow_leading_zeroes: false })
        .withMessage('Price must be a integer with min value 1')
        .notEmpty()
        .withMessage('Price cannot be empty'),
    checkValidations,
];

const orderValidator = [
    body('quantity')
        .isInt({ min: 1, allow_leading_zeroes: false })
        .withMessage('Quantity must be a integer with min value 1')
        .notEmpty()
        .withMessage('Quantity cannot be empty'),
    body('mealId')
        .isInt({ min: 1, allow_leading_zeroes: false })
        .withMessage('MealId must be a integer with min value 1')
        .notEmpty()
        .withMessage('MealId cannot be empty'),
    checkValidations,
];

module.exports = { createUserValidator, loginValidator, updateUserValidator, createRestaurantValidator, updateRestaurantValidator, reviewValidator, mealValidator, orderValidator };