import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { loginUser } from "../services/authService.js";
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
            rules={{
              required: "El correo electrónico es obligatorio",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "El formato de correo electrónico no es válido",
              },
            }}
            placeholder="Ingrese su correo electrónico"
          />

          <Input
            label="Contraseña"
            name="password"
            type="password"
            register={register}
            errors={errors}
            rules={{
              required: "La contraseña es obligatoria",
              minLength: {
                value: 6,
                message: "La contraseña debe tener al menos 6 caracteres",
              },
            }}
            placeholder="Ingrese su contraseña"
          />

          <div>
            {loginError && (
              <p className="text-red-500 text-sm mt-1">{loginError}</p>
            )}
          </div>

          <div>
            <Button type="submit" text="Enviar" />
          </div>

          <div>
            <Link to="/signup">
              <p className="text-light-dark text-center hover:text-light hover:underline underline-offset-4 decoration-2 decoration-light transition duration-300 ease-in-out transform hover:scale-105">
                ¿Eres nuevo en Cookinando? Regístrate
              </p>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};
