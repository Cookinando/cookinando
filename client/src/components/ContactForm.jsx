// src/components/ContactForm.jsx

import React from 'react';

const ContactForm = () => {
  return (
    <form>
      <label htmlFor="name">Nombre:</label>
      <input type="text" id="name" name="name" required />
      
      <label htmlFor="email">Email:</label>
      <input type="email" id="email" name="email" required />
      
      <button type="submit">Enviar</button>
    </form>
  );
};

export default ContactForm;
