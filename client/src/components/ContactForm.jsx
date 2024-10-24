// src/components/ContactForm.jsx
import React from 'react';

const ContactForm = () => {
  return (
    <form className="flex flex-col space-y-4">
      <input 
        type="text" 
        placeholder="Tu nombre" 
        className="p-2 border border-gray-300 rounded text-[#C1A881]" // Cambiar color del texto
        required 
      />
      <input 
        type="email" 
        placeholder="Tu correo" 
        className="p-2 border border-gray-300 rounded text-[#C1A881]" // Cambiar color del texto
        required 
      />
      <textarea 
        placeholder="Tu mensaje" 
        className="p-2 border border-gray-300 rounded text-[#C1A881]" // Cambiar color del texto
        required 
      />
      <button 
        type="submit" 
        className="p-2 rounded hover:bg-opacity-80" 
        style={{ backgroundColor: '#C1A881', color: 'white' }} // Color de fondo y del texto
      >
        Enviar
      </button>
    </form>
  );
};

export default ContactForm;
