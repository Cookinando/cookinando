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
        <h1 className="text-[#C1A881] text-4xl font-bold text-center">Gestión de Usuarios - Administradores</h1>
        <div className="grid grid-cols-1 gap-10 mt-10">
          <div className="p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4 text-center"></h2>
            <ul className="space-y-2">
              {usuarios.map((usuario, index) => (
                <li key={index} className="flex items-center justify-center text-lg">
                  <span className="text-xl mr-40">{usuario.nombre}</span> 
                  <input 
                    type="checkbox" 
                    checked={usuario.isAdmin} 
                    className="hidden" 
                    onChange={() => toggleAdmin(index)}
                    id={`checkbox-${index}`} 
                  />
                  <label 
                    htmlFor={`checkbox-${index}`} 
                    className={`cursor-pointer w-6 h-6 flex items-center justify-center border-2 border-gray-300 rounded ${
                      usuario.isAdmin ? 'bg-[#C1A881]' : 'bg-white'
                    } transition-colors duration-300`} 
                  >
                    {usuario.isAdmin && (
                      <span className="text-black text-xl">✔</span> 
                    )}
                  </label>
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
