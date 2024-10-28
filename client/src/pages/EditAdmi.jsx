import React, { useState } from 'react';


const EditAdmi = () => {
  
  const [usuarios, setUsuarios] = useState([
    { nombre: 'Laura Vega Re', isAdmin: false },
    { nombre: 'Magaly Lazarte', isAdmin: false },
    { nombre: 'Lorena Acosta', isAdmin: true },
  ]);

  
  const toggleAdmin = (index) => {
    setUsuarios((prevUsuarios) =>
      prevUsuarios.map((usuario, i) =>
        i === index ? { ...usuario, isAdmin: !usuario.isAdmin } : usuario
      )
    );
  };

  return (
    <div className="bg-[url('./assets/fondo.png')] bg-cover bg-center min-h-screen text-white">
      <section className="p-10">
        <h1 className="text-4xl font-bold text-center">Gestión de Usuarios</h1>
        <div className="flex justify-center items-center w-full h-[300px] my-6">
        </div>
      
        <div className="grid grid-cols-2 gap-10 mt-10">
          <div className="bg-gray-800 bg-opacity-70 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">administradores</h2>
            <ul className="space-y-2">
              {usuarios.map((usuario, index) => (
                <li key={index} className="text-lg">{usuario.nombre}</li>
              ))}
            </ul>
          </div>

          <div className="bg-gray-800 bg-opacity-70 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Administradores</h2>
            <ul className="space-y-2">
              {usuarios.map((usuario, index) => (
                <li key={index} className="flex items-center text-lg">
                  <input 
                    type="checkbox" 
                    checked={usuario.isAdmin} 
                    className="mr-2"
                    onChange={() => toggleAdmin(index)}
                  />
                  {usuario.nombre}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EditAdmi;
