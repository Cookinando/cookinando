import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';

const EditProfile = () => {
  const { user, setUser } = useContext(UserContext);
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
        <div>
            <label htmlFor="username" className="text-sm text-2xl leading-6">Nombre de usuario:</label>
            <div className="mt-2">
              <input type="text" {...register('username',{required:true})} className="w-[20rem] h-[3.25rem] px-4 text-black bg-primarylight"></input>
              {errors.name?.type === 'required' && <p>Es necesario ingresar un nombre de ususario</p>}
            </div>
          </div>
          <div>
            <label htmlFor="username" className="text-sm text-2xl leading-6">Correo electrónico:</label>
            <div className="mt-2">
              <input type="text" {...register('email',{required:true})} className="w-[20rem] h-[3.25rem] px-4 text-black bg-primarylight"></input>
              {errors.name?.type === 'required' && <p>Es necesario ingresar un correo electrónico</p>}
            </div>
          </div>
          <div>
            <label htmlFor="password" className="text-sm text-2xl leading-6">Contraseña:</label>
            <div className="mt-2">
              <input type="text" {...register('password',{required:true})} className="w-[20rem] h-[3.25rem] px-4 text-black bg-primarylight mb-4"></input>
              {errors.tags?.type === 'required' && <p>Es necesario ingresar una contraseña</p>}
            </div>
          </div>
          <div>
            <Button type="submit" handleSubmit="handleSubmit" text="Enviar" />
          </div>
        </form>
      </div>
  );
};

export default EditProfile;
