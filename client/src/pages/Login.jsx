import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import { loginUser } from '../services/authService.js';
import Button from "../components/Button";
import Input from "../components/Input";
import { useAuth } from "../context/AuthContext.jsx";

export const Login = () => {
  const { login } = useAuth();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const navigate = useNavigate();
  const [loginError, setLoginError] = useState(null);

  const onSubmit = async (data) => {
    const result = await loginUser(data);

    if (result.success) {
      login(result.userData.token, result.userData.user.role);
      navigate("/");
    } else {
      setLoginError(result.message);
    }
  };

  return (
    <div className="flex min-h-full flex-col justify-center items-center lg:px-8 bg-primary text-light-dark">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-4xl">Iniciar Sesión</h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm font-normal flex flex-col justify-center items-center">
        <form
          id="formlogin"
          className="space-y-6"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Input
            label="Correo electrónico"
            name="email"
            type="text"
            register={register}
            errors={errors}
            rules={{ required: true }}
            placeholder="Ingrese su correo electrónico"
          />
          <Input
            label="Contraseña"
            name="password"
            type="password"
            register={register}
            errors={errors}
            rules={{ required: true }}
            placeholder="Ingrese su contraseña"
          />
          <div>
            {loginError && 
            <p 
              style={{ color: 'red' }}
            >
              {loginError}
            </p>} {/* Mostrar el mensaje de error */}
          </div>
          <div>
            <Button 
              type="submit" 
              text="Enviar" 
            />
          </div>
        </form>
      </div>
    </div>
  );
};
