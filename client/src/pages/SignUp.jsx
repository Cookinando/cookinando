import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { signUpNewUser } from "../services/authService.js";
import Input from "../components/Input";
import { useAuth } from "../context/AuthContext.jsx";

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

  const onSubmit = async (data) => {
    try {
      const response = await signUpNewUser({ ...data });
      if (response && response.data.token) {
        await login(response.data.token);
        navigate("/");
      }
    } catch (error) {
      console.error("Error durante el registro:", error);
    }
  };

  return (
    <div className="flex min-h-full flex-col justify-center items-center lg:px-8 bg-primary text-light-dark">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-4xl">Crear usuario</h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm font-normal flex flex-col justify-center items-center">
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
        </form>
      </div>
    </div>
  );
};
