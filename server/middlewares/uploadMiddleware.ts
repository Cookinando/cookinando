import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../utils/cloudinaryConfig';

const fileFilter = (req: any, file: Express.Multer.File, cb: Function) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
  if (!allowedTypes.includes(file.mimetype)) {
    req.fileValidationError = 'Invalid file type. Only JPG, PNG, and WEBP are allowed.';
    return cb(null, false);
  }
  cb(null, true);
};

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: (req, file) => {
    return {
      folder: 'uploads', // carpeta en Cloudinary para almacenar imágenes
      format: 'webp',
      public_id: file.originalname.split('.')[0], // Genera un nombre único para la imagen
    };
  }
});

const upload = multer({ storage, fileFilter });

export default upload;
