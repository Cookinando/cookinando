import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import Button from "../components/Button";
import { signUpNewUser } from "../services/authService.js";
import Input from "../components/Input";
import { useAuth } from "../context/AuthContext.jsx";
import { useState } from "react";

export const SignUp = () => {
  const { login } = useAuth();
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm();
  const navigate = useNavigate();

  const password = watch("password");

  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async (data) => {
    try {
      const response = await signUpNewUser({ ...data });
      if (response.success && response.data.token) {
        await login(response.data.token);
        navigate("/");
      } else if (!response.success) {
        setErrorMessage(response.message);
      }
    } catch (error) {
      console.error("Error durante el registro:", error);
    }
  };

  return (
    <div className="flex min-h-full flex-col justify-center items-center pb-10 lg:px-8 bg-primary text-light-dark">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-4xl">Crear usuario</h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm font-normal flex flex-col justify-center items-center relative">
        <form
          id="formSignUp"
          className="space-y-6"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Input
            label="Nombre de usuario:"
            name="username"
            type="text"
            register={register}
            errors={errors}
            rules={{ required: "El nombre de usuario es obligatorio" }}
            placeholder="Ingrese su nombre de usuario"
          />
          <Input
            label="Correo electrónico:"
            name="email"
            type="text"
            register={register}
            errors={errors}
            rules={{
              required: "El correo electrónico es obligatorio",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: "El correo electrónico no es válido",
              },
            }}
            placeholder="Ingrese su correo electrónico"
          />
          <Input
            label="Contraseña:"
            name="password"
            type="password"
            register={register}
            errors={errors}
            rules={{ required: "La contraseña es obligatoria" }}
            placeholder="Ingrese su contraseña"
          />
          <Input
            label="Confirmar contraseña:"
            name="confirmPassword"
            type="password"
            register={register}
            errors={errors}
            rules={{
              required: "La confirmación de contraseña es obligatoria",
              validate: (value) =>
                value === password || "Las contraseñas no coinciden",
            }}
            placeholder="Confirme su contraseña"
          />

          <div>
            <Button type="submit" text="Enviar" />
          </div>

          {errorMessage && (
            <div className="absolute bottom-[-4rem] left-[2.2rem] w-[80%] text-center">
              <p className="text-red-500 mt-2">{errorMessage}</p>
            </div>
          )}
        </form>
        <div className="mt-4">
          <Link to="/login">
            <p className="text-light-dark text-center hover:text-light hover:underline underline-offset-4 decoration-2 decoration-light transition duration-300 ease-in-out hover:scale-105">
              ¿Tienes una cuenta? Inicia sesión
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};
