// src/pages/ListaUsuarios.jsx

import React from 'react';

// URL de fondo de imagen
const fondoImagen = '/path-to-your-background-image.jpg';

const ListaUsuarios = () => {
  // Ejemplo de datos
  const usuarios = ['Usuario 1', 'Usuario 2', 'Usuario 3'];
  const administradores = ['Admin 1', 'Admin 2', 'Admin 3'];

  return (
    <div
      style={{
        backgroundImage: `url(${fondoImagen})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px'
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '20px',
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          padding: '20px',
          borderRadius: '8px',
          maxWidth: '800px',
          width: '100%'
        }}
      >
        {/* Columna de Usuarios */}
        <div>
          <h2 style={{ color: '#C1A881' }}>Lista de Usuarios</h2>
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            {usuarios.map((usuario, index) => (
              <li key={index} style={{ margin: '10px 0' }}>
                {usuario}
              </li>
            ))}
          </ul>
        </div>

        {/* Columna de Administradores */}
        <div>
          <h2 style={{ color: '#C1A881' }}>Administradores</h2>
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            {administradores.map((admin, index) => (
              <li key={index} style={{ margin: '10px 0', display: 'flex', alignItems: 'center' }}>
                <input type="checkbox" style={{ marginRight: '10px' }} />
                {admin}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ListaUsuarios;
