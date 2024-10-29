import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import  { signUpNewUser } from '../services/authService.js'

export const SignUp = () => {
  const {register, formState:{errors},handleSubmit} = useForm();
  const navigate = useNavigate();
  const onSubmit = (data) =>{    
    signUpNewUser({...data})
    navigate("/") 
  }

    return (
      <div className="flex min-h-full flex-col justify-center items-center lg:px-8 bg-primary text-light-dark">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-4xl">Crear usuario</h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm font-normal flex flex-col justify-center items-center">
        <form id="formlogin" className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <div>
            <label htmlFor="username" className="text-xl leading-6">Nombre de usuario:</label>
            <div className="mt-2">
              <input type="text" {...register('username',{required:true})} className="w-[20rem] h-[3.25rem] px-4 text-black bg-primarylight"></input>
              {errors.name?.type === 'required' && <p>Es necesario ingresar un nombre de ususario</p>}
            </div>
          </div>
          <div>
            <label htmlFor="email" className="text-xl leading-6">Correo electrónico:</label>
            <div className="mt-2">
              <input type="text" {...register('email',{required:true})} className="w-[20rem] h-[3.25rem] px-4 text-black bg-primarylight"></input>
              {errors.name?.type === 'required' && <p>Es necesario ingresar un correo electrónico</p>}
            </div>
          </div>
          <div>
            <label htmlFor="password" className="text-xl leading-6">Contraseña:</label>
            <div className="mt-2">
              <input type="password" {...register('password',{required:true})} className="w-[20rem] h-[3.25rem] px-4 text-black bg-primarylight mb-4"></input>
              {errors.tags?.type === 'required' && <p>Es necesario ingresar una contraseña</p>}
            </div>
          </div>
          <div>
            <Button type="submit" handleSubmit="handleSubmit" text="Enviar" />
          </div>
        </form>
      </div>
    </div>
    );
  };