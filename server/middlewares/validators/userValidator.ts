import { body } from 'express-validator';    
import { Op } from 'sequelize';
import User from '../../models/userModel';
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
        .custom(async (value: string) => {
            const userEmail = await User.findOne({ where: { email: value } });
            if (!userEmail) {
                throw new Error('🚨El usuario no existe🚨');
            }
            return true; 
        }),
    (req: Request, res: Response, next: NextFunction) => validate(req, res, next)
  ];

export const validateSignUp = [

    body('username')
        .notEmpty().withMessage('🚨El nombre es obligatorio🚨')
        .isString().withMessage('🚨El nombre debe ser un texto🚨')
        .custom(async (value) => { //.custom te permite añadir una función personalizada que no pertenece al método de express-validator
            const existingUser = await User.findOne({ where: { username: value } });
                if (existingUser) {
                    throw new Error('🚨Este username ya está en uso🚨');
                }
                return true; // es una buena práctica devolver true si no hay errores
            }),

    body('password')
        .notEmpty().withMessage('🚨La contraseña es obligatoria🚨')
        .isString().withMessage('🚨La contraseña debe ser un texto🚨')
        .isLength({ min: 8 }).withMessage('🚨La contraseña debe tener al menos 8 caracteres🚨'),

    body('email')
        .notEmpty().withMessage('🚨El email es obligatorio🚨')
        .isString().withMessage('🚨El email debe ser un texto🚨')
        .isEmail().withMessage('🚨El email debe ser un correo válido🚨')
        .normalizeEmail() //esto sirve para convertir el email en minúsculas, quitarle los espacios, quitarle los caracteres especiales, etc.   
        .custom(async (value) => { //.custom te permite añadir una función personalizada que no pertenece al método de express-validator
            const existingUser = await User.findOne({ where: { email: value } });
                if (existingUser) {
                    throw new Error('🚨Este email ya está en uso🚨');
                }
                return true; // es una buena práctica devolver true si no hay errores
            }),
    (req: Request, res: Response, next: NextFunction) => validate(req, res, next)
  ];

  export const validateUpdateProfile = [

    body('username')
        .optional()
        .isString().withMessage('🚨El nombre debe ser un texto🚨')
        .custom(async (value, { req }) => {
            const userId = req.user?.id; // Extrae el ID del usuario desde req.user

            if (!userId) {
                throw new Error('🚨El ID del usuario no existe en el token🚨');
            }

            const existingUser = await User.findOne({
                where: {
                    username: value,
                    id: { [Op.ne]: userId }
                }
            });

            if (existingUser) {
                return Promise.reject('🚨Este nombre de usuario ya está en uso🚨');
            }

            return true; // Devuelve true si no hay errores
        }),

    body('email')
        .optional()
        .isString().withMessage('🚨El email debe ser un texto🚨')
        .isEmail().withMessage('🚨El email debe ser un correo válido🚨')
        .normalizeEmail()
        .custom(async (value, { req }) => {
            const userId = req.user?.id; // Extrae el ID del usuario desde req.user

            if (!userId) {
                throw new Error('🚨El ID del usuario no existe en el token🚨');
            }

            const existingEmail = await User.findOne({
                where: {
                    email: value,
                    id: { [Op.ne]: userId }
                }
            });

            if (existingEmail) {
                return Promise.reject('🚨El correo electrónico ya está en uso🚨');
            }

            return true; // Devuelve true si no hay errores
        }),

    body('password')
        .optional()
        .isString().withMessage('🚨La contraseña debe ser un texto🚨')
        .isLength({ min: 8 }).withMessage('🚨La contraseña debe tener al menos 8 caracteres🚨'),

    (req: Request, res: Response, next: NextFunction) => {
        validate(req, res, next);
    }
];