import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';

const Profile = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleEditClick = () => {
    navigate('/editprofile');
  };

  const handlePostRecipe = () => {
    navigate('/postrecipe')
  }

  const handleEditUsersRole = () => {
    navigate('/editusers')
  }

  return (
    <div className="flex min-h-full flex-col justify-center items-center lg:px-8 bg-primary">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm mb-8">
        <h2 className="mt-10 text-center text-4xl text-light-dark">¡Hola {user?.username}!</h2>
      </div>
      {user?.isAdmin ? (
        <div className="fmt-10 gap-5 sm:mx-auto sm:w-full sm:max-w-sm font-normal flex flex-col justify-center items-center">
          <Button type="submit" handleClick={handleEditClick} text="Editar perfil" />
          <Button type="submit" handleClick={handlePostRecipe} text="Subir receta" />
          <Button type="submit" handleClick={handleEditUsersRole} text="Editar usuarios" />
        </div>
      ) : (
        <div className='w-[20%]'>
          <div className="flex flex-col justify-center bg-light px-12 pt-12 pb-8">
            <div className='mb-16 flex flex-col gap-3'>
              <h3>Nombre de usuario:</h3>
              <p>{user?.username}</p>
              <h3>Email:</h3>
              <p>{user?.email}</p>
            </div>
            <Button type="submit" handleClick={handleEditClick} text="Editar perfil" />
          </div>        
        </div>
      )}
    </div>
  );
};

export default Profile;
