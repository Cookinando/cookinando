import React, { useState } from 'react';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name) {
      newErrors.name = 'El nombre es requerido';
    }
    if (!formData.email) {
      newErrors.email = 'El correo es requerido';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Correo no válido';
    }
    if (!formData.message) {
      newErrors.message = 'El mensaje es requerido';
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      console.log(formData);
      // Aquí puedes manejar el envío de los datos del formulario
      setErrors({}); // Limpiar errores
      // Resetear formulario si es necesario
      setFormData({
        name: '',
        email: '',
        message: ''
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
      <input 
        type="text" 
        name="name"
        placeholder="Tu nombre" 
        value={formData.name}
        onChange={handleChange}
        className={`p-2 border border-gray-300 rounded text-[#C1A881] ${errors.name ? 'border-red-500' : ''}`}
        required 
      />
      {errors.name && <span className="text-red-500">{errors.name}</span>} {/* Mensaje de error para nombre */}

      <input 
        type="email" 
        name="email"
        placeholder="Tu correo" 
        value={formData.email}
        onChange={handleChange}
        className={`p-2 border border-gray-300 rounded text-[#C1A881] ${errors.email ? 'border-red-500' : ''}`}
        required 
      />
      {errors.email && <span className="text-red-500">{errors.email}</span>} {/* Mensaje de error para email */}

      <textarea 
        name="message"
        placeholder="Tu mensaje" 
        value={formData.message}
        onChange={handleChange}
        className={`p-2 border border-gray-300 rounded text-[#C1A881] ${errors.message ? 'border-red-500' : ''}`}
        required 
      />
      {errors.message && <span className="text-red-500">{errors.message}</span>} {/* Mensaje de error para mensaje */}

      <button 
        type="submit" 
        className="p-2 rounded hover:bg-opacity-80" 
        style={{ backgroundColor: '#C1A881', color: 'white' }} 
      >
        Enviar
      </button>
    </form>
  );
};

export default ContactForm;
