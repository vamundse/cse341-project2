const { body, validationResult } = require('express-validator');

const boatValidationRules = () => {
    return [
        body('brand')
        .notEmpty()
        .withMessage('Brand is required')
        .isString()
        .withMessage('Brand must be a string')
        .isLength({ min: 3 })
        .withMessage('Brand must be minimum three characters'),
        body('model')
        .notEmpty()
        .withMessage('Model is required')
        .isString()
        .withMessage('Model must be a string')
        .isLength({ min: 3 })
        .withMessage('Model must be minimum three characters'),
        body('year')
        .isInt({ min: 1900, max: 2100})
        .withMessage('The year must be a 4-digit number'),
        body('type')
        .isString()
        .withMessage('Type must be a string')
        .isLength({ min: 3 })
        .withMessage('Type must be minimum three characters'),
        body('class')
        .isString()
        .withMessage('Class must be a string')
        .isLength({ min: 3 })
        .withMessage('Class must be minimum three characters'),
        body('length')
        .notEmpty()
        .withMessage('The length is required')
        .isString()
        .withMessage('Length must be a string'),
        body('fuel')
        .isString()
        .withMessage('Fuel must be a string')
        .isLength({ min: 3 })
        .withMessage('Fuel must be minimum three characters'),
        body('material')
        .isString()
        .withMessage('Material must be a string')
        .isLength({ min: 3 })
        .withMessage('Material must be minimum three characters'),
    ]
}

const jetskiValidationRules = () => {
    return [
        body('brand')
        .notEmpty()
        .withMessage('Brand is required')
        .isString()
        .withMessage('Brand must be a string')
        .isLength({ min: 3 })
        .withMessage('Brand must be minimum three characters'),
        body('model')
        .notEmpty()
        .withMessage('Model is required')
        .isString()
        .withMessage('Model must be a string')
        .isLength({ min: 3 })
        .withMessage('Model must be minimum three characters'),
        body('horsepower')
        .isString()
        .withMessage('Horsepower must be a string')
        .isLength({ min: 3 })
        .withMessage('Horsepower must be minimum three characters'),
        body('weight')
        .isString()
        .withMessage('Weight must be a string')
        .isLength({ min: 3 })
        .withMessage('Weight must be minimum three characters'),
        body('storage')
        .isString()
        .withMessage('Storage must be a string')
        .isLength({ min: 3 })
        .withMessage('Storage must be minimum three characters'),
        body('persons')
        .isString()
        .withMessage('Persons must be a string')
        .isLength({ min: 3 })
        .withMessage('Persons must be minimum three characters'),
        body('fueltank')
        .isString()
        .withMessage('Fueltank must be a string')
        .isLength({ min: 3 })
        .withMessage('Fueltank must be minimum three characters'),
    ]
}

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if(errors.isEmpty()) {
        return next()
    }

    const extractedErrors = []
    errors.array().map(err => extractedErrors.push({ [err.path]: err.msg }));
    return res.status(422).json({ errors: extractedErrors });
}

module.exports = { validate, boatValidationRules, jetskiValidationRules }