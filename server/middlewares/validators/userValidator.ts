import { body } from 'express-validator';    
import { validate } from './handleValidator';
import { Request, Response, NextFunction } from 'express';
    
export const validateLogIn = [

    body('password')
        .notEmpty().withMessage('🚨La contraseña es obligatoria🚨')
        .isString().withMessage('🚨La contraseña debe ser un texto🚨'),

    body('email')
        .notEmpty().withMessage('🚨El email es obligatorios🚨')
        .isString().withMessage('🚨Los tags deben ser un texto🚨')
        .isEmail().withMessage('🚨El email debe ser un correo válido🚨')
        .normalizeEmail()
        .custom(async (value) => {
            return true;
          }),
    (req: Request, res: Response, next: NextFunction) => validate(req, res, next)
  ];

export const validateSignUp = [

    body('username')
        .notEmpty().withMessage('🚨El nombre es obligatorio🚨')
        .isString().withMessage('🚨El nombre debe ser un texto🚨'),

    body('password')
        .notEmpty().withMessage('🚨La contraseña es obligatoria🚨')
        .isString().withMessage('🚨La contraseña debe ser un texto🚨')
        .isLength({ min: 8 }).withMessage('🚨La contraseña debe tener al menos 8 caracteres🚨'),

    body('email')
        .notEmpty().withMessage('🚨El email es obligatorio🚨')
        .isString().withMessage('🚨El email debe ser un texto🚨')
        .isEmail().withMessage('🚨El email debe ser un correo válido🚨')
        .normalizeEmail() 
        .custom(async (value) => {
            return true;
          }),
    (req: Request, res: Response, next: NextFunction) => validate(req, res, next)
  ];

export const validateUpdateProfile = [

    body('username')
        .optional()
        .isString().withMessage('🚨El nombre debe ser un texto🚨')
        .custom(async (value) => {
            return true;
          }),

    body('email')
        .optional()
        .isString().withMessage('🚨El email debe ser un texto🚨')
        .isEmail().withMessage('🚨El email debe ser un correo válido🚨')
        .normalizeEmail()
        .custom(async (value) => {
            return true;
          }),

    body('password')
            .optional()
            .isString().withMessage('🚨La contraseña debe ser un texto🚨'),
            
    (req: Request, res: Response, next: NextFunction) => validate(req, res, next)
  ];