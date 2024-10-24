import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

const EditProfile = () => {
  const { user, setUser } = useContext(UserContext); // Asegúrate de tener un setUser en el contexto
  const { register, handleSubmit } = useForm({
    defaultValues: {
      username: user?.username,
      email: user?.email,
    }
  });
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    // Lógica para actualizar la información del usuario en el backend
    // Aquí harías una solicitud PUT a tu API para actualizar la información del usuario
    // Suponiendo que la actualización es exitosa, actualizas el contexto del usuario
    setUser({ ...user, ...data });
    navigate('/profile'); // Navega de vuelta al perfil
  };

  return (
    <div>
      <h1>Edit Profile</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Username</label>
          <input {...register('username')} />
        </div>
        <div>
          <label>Email</label>
          <input {...register('email')} />
        </div>
        <button type="submit">Guardar Cambios</button>
      </form>
    </div>
  );
};

export default EditProfile;
