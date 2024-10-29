import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../utils/cloudinaryConfig';

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: (req, file) => {
    return {
      folder: 'uploads', // Opcional: carpeta en Cloudinary para almacenar imágenes
      allowed_formats: ['jpg', 'jpeg', 'png'], // Formatos permitidos
      public_id: `${Date.now()}-${file.originalname}`, // Genera un nombre único para la imagen
    };
  }
});

const upload = multer({ storage });

export default upload;
