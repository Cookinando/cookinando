import { body, param } from 'express-validator';    
    
export const validateLogIn = [

    param('id')
        .isInt().withMessage('🚨El ID debe ser un número entero🚨')
        .notEmpty().withMessage('🚨El ID es obligatorio🚨')
        .custom(async (value) => {
            const usuario = await Usuario.findById(value); // Busca el usuario por ID
            if (!usuario) {
                throw new Error('🚨El ID no existe en la base de datos🚨');
            }
            return true; // Si el usuar2io existe, se retorna true
        }),

    body('username')
        .notEmpty().withMessage('🚨El nombre es obligatorio🚨')
        .isString().withMessage('🚨El nombre debe ser un texto🚨'),

    body('password')
        .notEmpty().withMessage('🚨La contraseña es obligatoria🚨')
        .isString().withMessage('🚨La contraseña debe ser un texto🚨'),
        //falta añadir la comparación entre contrseñas con bcrypt

    body('email')
        .notEmpty().withMessage('🚨El email es obligatorios🚨')
        .isString().withMessage('🚨Los tags deben ser un texto🚨')
        .isEmail().withMessage('🚨El email debe ser un correo válido🚨')
        .normalizeEmail()
        .custom(async (value) => {
            const user = await User.findOne({ where: { email: value } });
            if (!user) {
                throw new Error('🚨El usuario no existe🚨');
            }
            return true;
        }),

    body('isAdmin')
        .isBoolean().withMessage('🚨El campo isAdmin debe ser un verdadero o falso🚨')
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
    body('isAdmin')
         .isBoolean().withMessage('🚨El campo isAdmin debe ser un verdadero o falso🚨')
  ];

export const validateUpdateProfile = [
    param('id')
        .isInt().withMessage('🚨El ID debe ser un número entero🚨')
        .notEmpty().withMessage('🚨El ID es obligatorio🚨')
        .custom(async (value) => {
            const usuario = await Usuario.findById(value); // Busca el usuario por ID
            if (!usuario) {
                throw new Error('🚨El ID no existe en la base de datos🚨');
            }
            return true; // Si el usuario existe, se retorna true
        }),

    body('username')
        .notEmpty().withMessage('🚨El nombre es obligatorio🚨')
        .isString().withMessage('🚨El nombre debe ser un texto🚨'),

    body('email')
    .notEmpty().withMessage('🚨El email es obligatorio🚨')
    .isString().withMessage('🚨Los tags deben ser un texto🚨')
    .isEmail().withMessage('🚨El email debe ser un correo válido🚨')
    .normalizeEmail()
    .custom(async (value, { req }) => {
        const user = await User.findOne({ where: { email: value, id: { [Op.ne]: req.params.id } } });
        if (user) {
          return Promise.reject('🚨El correo electrónico ya está en uso🚨');
        }
        }),

        body('password')
            .notEmpty().withMessage('🚨La contraseña es obligatoria🚨')
            .isString().withMessage('🚨La contraseña debe ser un texto🚨')
            .isLength({ min: 8 }).withMessage('🚨La contraseña debe tener al menos 8 caracteres🚨'),
            //falta añadir la comparación entre contrseñas con bcrypt

        body('isAdmin')
        .isBoolean().withMessage('🚨El campo isAdmin debe ser un verdadero o falso🚨')
  ];