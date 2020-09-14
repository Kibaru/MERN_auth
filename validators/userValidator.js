const { check, validationResult } = require('express-validator');

exports.userValidationResult = (req, res, next) => {
    const result = validationResult(req);
    if(!result.isEmpty()){
        // const error = result.array()[0].msg;
        const error = result.array();
        // const error = result;
        return res.status(422).json({ success: false, error: error });
    }
    next();
}

exports.registerValidator = [
    check('firstname')
        .trim()
        .not()
        .isEmpty()
        .withMessage('First name is required!')
        .isLength({min:3, max:20})
        .withMessage('First name must be between 3 to 20 characters long!'),
    check('lastname')
        .trim()
        .not()
        .isEmpty()
        .withMessage('Last name is required!')
        .isLength({min:3, max:20})
        .withMessage('Last name must be between 3 to 20 characters long!'),
    check('email')
        .trim()
        .not()
        .isEmpty()
        .withMessage('Email is required!')
        .isEmail()
        .withMessage('Please provide a valid email.'),
    check('password')
        .trim()
        .not()
        .isEmpty()
        .withMessage('Password is required!')
        .isLength({min:6})
        .withMessage('Password must be between 6 characters long!')
]
exports.loginValidator = [
    check('email')
        .trim()
        .not()
        .isEmpty()
        .withMessage('Email is required!')
        .isEmail()
        .withMessage('Please provide a valid email.'),
    check('password')
        .trim()
        .not()
        .isEmpty()
        .withMessage('Password is required!')
        .isLength({min:6})
        .withMessage('Password must be between 6 characters long!')
]
