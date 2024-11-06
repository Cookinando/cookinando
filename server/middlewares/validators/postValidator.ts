import { body } from 'express-validator';    
import { validate } from './handleValidator';
import { Request, Response, NextFunction } from 'express';

export const validateCreatePost = [
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
            .isLength({ min: 10, max: 3000 }).withMessage('🚨Las instrucciones deben tener como mínimo 10 caracteres y como máximo 3000 caracteres.🚨'),
        (req: Request, res: Response, next: NextFunction) => validate(req, res, next)
];   

export const validateUpdatePost = [
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
        .isLength({ min: 10, max: 3000 }).withMessage('🚨Las instrucciones deben tener como mínimo 10 caracteres y como máximo 3000 caracteres.🚨'),
        (req: Request, res: Response, next: NextFunction) => validate(req, res, next)
];