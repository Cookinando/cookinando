import { body, param, ValidationChain } from 'express-validator';    
import { Op } from 'sequelize';
import User from '../../models/userModel';
    
export const validateLogIn: ValidationChain[] = [

    body('username')
        .notEmpty().withMessage('🚨El nombre de usuario es obligatorio🚨')
        .isString().withMessage('🚨El nombre de usuario debe ser un texto🚨')
        .custom(async (value: string) => {
            const userName = await User.findOne({ where: { username: value } });
            if (!userName) {
                throw new Error('🚨El usuario no existe🚨');
            }
            return true;
        }),

    body('password')
        .notEmpty().withMessage('🚨La contraseña es obligatoria🚨')
        .isString().withMessage('🚨La contraseña debe ser un texto🚨'),
        //falta añadir la comparación entre contrseñas con bcrypt

    // body('email')
    //     .notEmpty().withMessage('🚨El email es obligatorios🚨')
    //     .isString().withMessage('🚨Los tags deben ser un texto🚨')
    //     .isEmail().withMessage('🚨El email debe ser un correo válido🚨')
    //     .normalizeEmail()
    //     .custom(async (value: string) => {
    //         const userEmail = await User.findOne({ where: { email: value } });
    //         if (!userEmail) {
    //             throw new Error('🚨El usuario no existe🚨');
    //         }
    //         return true;
    //     }),
  ];

export const validateSignUp: ValidationChain[] = [

    body('username')
        .notEmpty().withMessage('🚨El nombre es obligatorio🚨')
        .isString().withMessage('🚨El nombre debe ser un texto🚨'),

    body('password')
        .notEmpty().withMessage('🚨La contraseña es obligatoria🚨')
        .isString().withMessage('🚨La contraseña debe ser un texto🚨')
        .isLength({ min: 8 }).withMessage('🚨La contraseña debe tener al menos 8 caracteres🚨'),

    body('email')
        .notEmpty().withMessage('🚨El email es obligatorio🚨')
        .isString().withMessage('🚨Los tags deben ser un texto🚨')
        .isEmail().withMessage('🚨El email debe ser un correo válido🚨')
        .normalizeEmail() //esto sirve para convertir el email en minúsculas, quitarle los espacios, quitarle los caracteres especiales, etc.   
        .custom(async (value) => { //.custom te permite añadir una función personalizada que no pertenece al método de express-validator
            const existingUser = await User.findOne({ where: { email: value } });
                if (existingUser) {
                    throw new Error('🚨Este email ya está en uso🚨');
                }
                return true;
            }),
  ];

export const validateUpdateProfile: ValidationChain[] = [

    body('username')
        .notEmpty().withMessage('🚨El nombre es obligatorio🚨')
        .isString().withMessage('🚨El nombre debe ser un texto🚨')
        .custom(async (value, { req }) => {
            const userId = req.params?.id;
                if (!userId) {
                    throw new Error('🚨El ID del usuario no existe🚨');
                }
    
            const updateUserName = await User.findOne({ 
                where: { 
                    username: value, 
                    id: { [Op.ne]: userId } } });
    
            if (updateUserName) {
                return Promise.reject('🚨Este nombre de usuario ya está en uso🚨');
            }
                return true; // es una buena práctica devolver true si no hay errores
            }),

    body('email')
        .notEmpty().withMessage('🚨El email es obligatorio🚨')
        .isString().withMessage('🚨El email debe ser un texto🚨')
        .isEmail().withMessage('🚨El email debe ser un correo válido🚨')
        .normalizeEmail()
        .custom(async (value, { req }) => {
            const userId = req.params?.id;
                if (!userId) {
                    throw new Error('🚨El ID del usuario no existe🚨');
                }

            const updatedEmail = await User.findOne({ 
                where: { 
                    email: value, 
                    id: { [Op.ne]: userId } } });

            if (updatedEmail) {
                return Promise.reject('🚨El correo electrónico ya está en uso🚨');
            }
                return true; // es una buena práctica devolver true si no hay errores
            }),

    body('password')
            .notEmpty().withMessage('🚨La contraseña es obligatoria🚨')
            .isString().withMessage('🚨La contraseña debe ser un texto🚨')
            .isLength({ min: 8 }).withMessage('🚨La contraseña debe tener al menos 8 caracteres🚨'),
  ];