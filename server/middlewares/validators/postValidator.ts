import { body, param, ValidationChain } from 'express-validator';    

export const validateCreatePost: ValidationChain[] = [
    param('id')
        .notEmpty().withMessage('El ID es obligatorio')
        .isInt().withMessage('El ID debe ser un número entero'),
    body('title')
        .notEmpty().withMessage('🚨El nombre de la receta es obligatorio🚨')
        .isString().withMessage('🚨El nombre de la rececta debe ser un texto🚨')
        .isLength({ max: 50 }).withMessage('🚨El nombre de la receta puede tener un máximo de 50 caracteres🚨'),
    body('numPeople')
        .notEmpty().withMessage('🚨El número de personas es obligatorio🚨')
        .isInt().withMessage('🚨El número de personas debe ser un número entero🚨')
        .isLength({ max: 2 }).withMessage('🚨El número de personas puede tener un máximo de 2 dígitos🚨'),
    body('ingredients')
        .notEmpty().withMessage('🚨Los ingredientes de la receta son obligatorios🚨')
        .isArray().withMessage('🚨Los ingredientes deben ser una lista🚨'),
    body('instructions')
        .notEmpty().withMessage('🚨Las instrucciones de preparación son obligatorias🚨')
        .isLength({ min: 50, max: 3000 }).withMessage('🚨Las instrucciones deben tener como mínimo 10 caracteres y como máximo 3000 caracteres.🚨'),
    body('imageUrl')
        .notEmpty().withMessage('🚨La imagen es obligatoria🚨')
        .isString().withMessage('🚨Debes añadir la dirección URL de la imagen que deseas añadir🚨'),
    body('authorId')
        .notEmpty().withMessage('🚨El autor es obligatorio🚨')
];

export const validateUpdatePost: ValidationChain[] = [
    param('id')
        .notEmpty().withMessage('El ID es obligatorio')
        .isInt().withMessage('El ID debe ser un número entero'),
    body('title')
        .notEmpty().withMessage('🚨El nombre de la receta es obligatorio🚨')
        .isString().withMessage('🚨El nombre de la rececta debe ser un texto🚨')
        .isLength({ max: 50 }).withMessage('🚨El nombre de la receta puede tener un máximo de 50 caracteres🚨'),
    body('numPeople')
        .notEmpty().withMessage('🚨El número de personas es obligatorio🚨')
        .isInt().withMessage('🚨El número de personas debe ser un número entero🚨')
        .isLength({ max: 2 }).withMessage('🚨El número de personas puede tener un máximo de 2 dígitos🚨'),
    body('ingredients')
        .notEmpty().withMessage('🚨Los ingredientes de la receta son obligatorios🚨')
        .isArray().withMessage('🚨Los ingredientes deben ser una lista🚨'),
    body('instructions')
        .notEmpty().withMessage('🚨Las instrucciones de preparación son obligatorias🚨')
        .isLength({ min: 50, max: 3000 }).withMessage('🚨Las instrucciones deben tener como mínimo 10 caracteres y como máximo 3000 caracteres.🚨'),
    body('imageUrl')
        .notEmpty().withMessage('🚨La imagen es obligatoria🚨')
        .isString().withMessage('🚨Debes añadir la dirección URL de la imagen que deseas añadir🚨'),
    body('authorId')
        .notEmpty().withMessage('🚨El autor es obligatorio🚨')
];

export const validateDeletePost: ValidationChain[] = [
    param('id')
        .notEmpty().withMessage('🚨El ID de la receta es obligatorio🚨')
        .isInt({ gt: 0 }).withMessage('🚨El ID debe ser un número entero positivo🚨'), //gt: "greater than 0" el número debe ser mayor que 0
];