// Home page
// src/pages/Home.jsx
import React from 'react';
import ContactForm from '../components/ContactForm'; // Asegúrate de tener este componente

const Home = () => {
  return (
    <div 
      style={{
        backgroundImage: 'url(./assets/fondo.png)', // Asegúrate de que la ruta sea correcta
        backgroundSize: 'cover', // O 'contain' dependiendo de cómo quieres que se vea
        backgroundPosition: 'center',
        height: '100vh', // Asegúrate de que cubra toda la altura de la vista
        color: '#fff' // Cambia el color del texto si es necesario
      }}
    >
      <section>
        <h1>Bienvenido a nuestra empresa</h1>
        <p>Aquí puedes encontrar información sobre nosotros.</p>
        <img src="./assets/logo.png" alt="Logo" />
      </section>

      <section>
        <h2>Recetas</h2>
        <div className="recetas">
          {/* Aquí irán tus imágenes de recetas */}
        </div>
      </section>

      <section>
        <ContactForm />
      </section>
    </div>
  );
};

export default Home;
