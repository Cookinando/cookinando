import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';

const Profile = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleEditClick = () => {
    navigate('edit');
  };

  const handlePostRecipe = () => {
    navigate('/auth/admin/newrecipe');
  }

  const handleEditUsersRole = () => {
    navigate('/auth/admin/editadmin')
  }

  return (
    <div className="flex min-h-full flex-col justify-center items-center lg:px-8 bg-primary">
      {user?.role === 'admin' ? (
        <div>
          <div className="sm:mx-auto sm:w-full sm:max-w-sm mb-8">
            <h2 className="mt-10 text-center text-4xl text-light-dark">¡Hola {user?.username}!</h2>
          </div>
          <div className="fmt-10 gap-5 sm:mx-auto sm:w-full sm:max-w-sm font-normal flex flex-col justify-center items-center">
            <Button type="submit" handleClick={handleEditClick} text="Editar perfil" />
            <Button type="submit" handleClick={handlePostRecipe} text="Subir receta" />
            <Button type="submit" handleClick={handleEditUsersRole} text="Editar usuarios" />
          </div>
        </div>
      ) : (
        <div className='w-[50%] flex flex-col justify-center items-center'>
          <div className="sm:mx-auto sm:w-full sm:max-w-sm mb-8 w-[100%]">
            <h2 className="mt-10 text-center text-4xl text-light-dark">Información de usuario</h2>
          </div>
          <div>
            <div className="flex flex-col justify-center px-12 pt-12 pb-8">
              <div className='mb-16 flex flex-col gap-3 bg-light-dark p-12'>
                <ul className='list-disc flex flex-col justify-center gap-4 items-center text-xl px-20'>
                <li><h3 className='font-bold'>Nombre de usuario:</h3></li>
                <p>{user?.username}</p>
                <li><h3 className='font-bold'>Correo electrónico:</h3></li>
                <p>{user?.email}</p>
                </ul>
              </div>
            </div>        
          </div>
          <div className='w-60'>
              <Button type="submit" handleClick={handleEditClick} text="Editar perfil" />
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
