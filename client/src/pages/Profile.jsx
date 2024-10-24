import React, { useContext, useState } from 'react';
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);

  const handleEditClick = () => {
    navigate('/edit-profile');
  };

  return (
    <div>
      <h1>Profile Page</h1>
      {user?.isAdmin ? (
        <div>
          <button>Admin Button 1</button>
          <button>Admin Button 2</button>
          <button>Admin Button 3</button>
        </div>
      ) : (
        <div>
          <table>
            <tbody>
              <tr>
                <td>Username</td>
                <td>{user?.username}</td>
              </tr>
              <tr>
                <td>Email</td>
                <td>{user?.email}</td>
              </tr>
              {/* Añade más campos según sea necesario */}
            </tbody>
          </table>
          <button onClick={handleEditClick}>Actualizar Información</button>
        </div>
      )}
    </div>
  );
};

export default Profile;
