// Home page
// src/pages/Home.jsx
import React from 'react';
import ContactForm from '../components/ContactForm'; // Asegúrate de tener este componente

const Home = () => {
  return (
    <div 
      style={{
        backgroundImage: 'url(./assets/fondo.png)', 
        backgroundSize: 'cover', 
        backgroundPosition: 'center',
        height: '100vh', 
        color: '#white' 
      }}
    >
      <section>
        <h1>Bienvenido </h1>
        <img src="./assets/logo1.svg" alt="Logo" />
        <p>¡Explora el mundo a través de la gastronomía y disfruta cocinando con nosotros!</p>
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