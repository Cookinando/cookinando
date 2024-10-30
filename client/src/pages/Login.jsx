import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Input from "../components/Input";

export const Login = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const navigate = useNavigate();
  const onSubmit = (data) =>{    
    loginUser({...data})
    navigate("/") 
  }

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
            register={register}
            errors={errors}
            rules={{ required: true }}
            placeholder="Ingrese su correo electrónico"
          />
          <Input
            label="Contraseña"
            name="password"
            register={register}
            errors={errors}
            rules={{ required: true }}
            placeholder="Ingrese su contraseña"
          />
          <div>
            <Button type="submit" handleSubmit="handleSubmit" text="Enviar" />
          </div>
        </form>
      </div>
    </div>
  );
};
