import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import  { signUpNewUser } from '../services/authService.js'
import Input from "../components/Input";
import { useAuth } from "../context/AuthContext.jsx"

export const SignUp = () => {
  const { login } = useAuth()
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data) => {    
    try {
      const response = await signUpNewUser({ ...data }); // Espera a que la solicitud se complete
      if (response && response.token) {
        await login(response.token); // Llama a login con el token obtenido
        navigate("/"); // Redirige después de iniciar sesión
      }
    } catch (error) {
      console.error('Error durante el registro:', error); // Manejo de errores opcional
    }
  };

  return (
    <div className="flex min-h-full flex-col justify-center items-center lg:px-8 bg-primary text-light-dark">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-4xl">Crear usuario</h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm font-normal flex flex-col justify-center items-center">
        <form
          id="formlogin"
          className="space-y-6"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Input
            label="Nombre de usuario:"
            name="username"
            register={register}
            errors={errors}
            rules={{ required: true }}
            placeholder="Ingrese su nombre de usuario"
          />
          <Input
            label="Correo electrónico:"
            name="email"
            register={register}
            errors={errors}
            rules={{ required: true }}
            placeholder="Ingrese su correo electrónico"
          />
          <Input
            label="Contraseña:"
            name="password"
            register={register}
            errors={errors}
            rules={{ required: true }}
            placeholder="Ingrese su contraseña"
          />
          <div>
            <Button type="submit" text="Enviar" />
          </div>
        </form>
      </div>
    </div>
  );
};
