# COOKINANDO (PROYECTO FULLSTACK) 🍽️

![](./client/src/assets/images/readme/home_desktop.png)


Este es nuestro primer proyecto fullstack, una página de recetas con un diseño minimalista y atractivo que prioriza la experiencia del usuario. Hemos implementado funcionalidades avanzadas de autenticación y gestión de usuarios. Los usuarios pueden registrarse, iniciar sesión y navegar por las recetas disponibles en la página principal, y aquellos registrados pueden acceder a los detalles de cada receta.

La aplicación cuenta con un sistema de manejo de roles. Los administradores tienen permisos especiales que les permiten subir, editar y eliminar recetas, además de gestionar los roles de otros usuarios. La autenticación se realiza mediante JWT (JSON Web Tokens) con expiración, y las contraseñas se almacenan de forma segura utilizando bcrypt para encriptación.

Para el manejo de sesiones y permisos en toda la interfaz de usuario, utilizamos AuthContext, lo que facilita la gestión del estado de autenticación en el frontend.

El proyecto sigue los principios de Green Code, aplicando buenas prácticas de eficiencia de recursos y optimización de código para reducir el impacto medioambiental. Esto no solo mejora el rendimiento de la aplicación, sino que también ayuda a minimizar su huella ecológica.

Este proyecto representa un paso importante en nuestro aprendizaje, al integrar el frontend y el backend en una sola aplicación, aplicar medidas de seguridad para proteger los datos y contribuir al desarrollo sostenible.

## Estructura del proyecto

- **client/**: Contiene el código del frontend.
- **server/**: Contiene el código del backend.

## Documentación de la API 📄

Puedes acceder a la documentación completa de la API en Postman a través del siguiente enlace:
[Documentación de la API de Cookinando](https://www.postman.com/spaceflight-operator-27824522/cookinando/documentation/6insvwo/cookinando-api?workspaceId=afea709e-a6e1-43ca-af45-2ec9d2040405)

## Herramientas utilizadas 🛠️

### Frontend 👀

- **React**: Biblioteca de JavaScript para construir interfaces de usuario interactivas.
- **Vite**: Herramienta de desarrollo y construcción rápida para aplicaciones web.
- **Tailwind CSS**: Framework CSS de utilidades para crear interfaces personalizadas de forma rápida.
- **Axios**: Cliente HTTP para realizar peticiones a la API.
- **React Router Dom**: Biblioteca para manejar rutas y navegación.
- **React Hook Form**: Biblioteca para gestionar formularios.
- **SweetAlert2**: Biblioteca para mostrar alertas personalizadas.
- **Cloudinary**: Servicio de gestión y optimización de imágenes y videos en la nube.
- **JWT Decode**: Decodificación de JSON Web Tokens para autenticación en el frontend.
  
### Backend 🫀

- **Express**: Framework para Node.js para construir aplicaciones web y APIs.
- **Sequelize**: ORM para interactuar con la base de datos MySQL.
- **MySQL2**: Paquete de MySQL compatible con Node.js.
- **bcrypt**: Para encriptar contraseñas.
- **jsonwebtoken**: Para la autenticación mediante JWT.
- **Multer** y **Multer Storage Cloudinary**: Middleware para la subida de archivos y almacenamiento en Cloudinary.
- **dotenv**: Cargar variables de entorno desde un archivo `.env`.
- **Express Validator**: Validación de datos en las rutas.
- **Cors**: Para habilitar CORS en el backend.

## Puertos en local 🛣️

- **Frontend**: http://localhost:5173/
- **Backend**: http://localhost:8000

> Nota: Asegúrate de que los puertos configurados no entren en conflicto con otras aplicaciones en tu sistema. Si necesitas cambiarlos, puedes modificar las configuraciones en los archivos correspondientes.

## Despliegue 🚀

Puedes acceder a la aplicación desplegada en el siguiente enlace:
[Cookinando](https://cookinando-eaf15.web.app/)

La API de la aplicación está desplegada en Render:
[Cookinando API](https://cookinando.onrender.com/)

## Configuración ⚙️

Para configurar y ejecutar el proyecto, sigue estos pasos:

1. Clona este repositorio en tu máquina local:

   ```bash
   git clone https://github.com/Cookinando/cookinando

2.  Crea un archivo .env en el directorio del servidor (server/) y agrega tus variables de entorno:

    ```bash	
    DB_DEV_NAME= xxxx                     
    DB_USER= xxxx
    DB_PASSWORD= xxxx
    DB_HOST= xxxx
    PORT= xxxx
    JWT_SECRET= xxxx
    CLOUDINARY_CLOUD_NAME= xxxx
    CLOUDINARY_API_KEY= xxxx
    CLOUDINARY_API_SECRET= xxxx

3. Viaja a la carpeta de client para ejecutar el frontend:

    ```bash
    cd client

4. Instala las dependencias del frontend:

    ```bash	
    npm install

5. Inicia tu servidor del frontend:

    ```bash	
    npm run dev

6. Inicia los tests de frontend: 

     ```bash	
    npm run test

7. Viaja a la carpeta de server para ejecutar el backend:

    ```bash
    cd server

8. Instala las dependencias del frontend:

    ```bash	
    npm install

9. Inicia tu servidor del backend:

    ```bash	
    npm run dev

10. Inicia los tests de backend: 

     ```bash	
    npm run test

## Integrantes del equipo 👥

- [Lorena Acosta](https://github.com/LorelizDev) - Scrum Master/Developer
- [Emmanuel Martinez](https://github.com/Rada749) - Product Owner/Developer
- [Magaly Lazarte](https://github.com/MAGALYLAZARTE) - Designer/Developer
- [Laura De Vega](https://github.com/devegalaura-dev) - Developer

## Licencia 📃

Este proyecto está bajo la Licencia MIT. Consulta el archivo LICENSE para más detalles.