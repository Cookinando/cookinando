import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../context/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import Input from '../components/Input';

const EditProfile = () => {
  const { user, setUser } = useContext(AuthContext);
  const { register, formState:{errors}, handleSubmit } = useForm({
    defaultValues: {
      username: user?.username,
      email: user?.email,
    }
  });
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    // Peticion PUT
    setUser({ ...user, ...data });
    navigate('/profile');
  };

  return (
    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm font-normal flex flex-col justify-center items-center text-light-dark">
        <form id="formlogin" className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
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
            <Button type="submit" handleSubmit="handleSubmit" text="Enviar" />
          </div>
        </form>
      </div>
  );
};

export default EditProfile;
