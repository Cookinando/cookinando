// Home page
import React from 'react';
import ContactForm from '../components/ContactForm'; 


const Home = () => {
  return (
    <div className="bg-[url('./assets/fondo.png')] bg-cover bg-center h-screen text-white">
      <section className="p-10">
        <h1 className="text-4xl font-bold"></h1>
        <img src="client/src/assets/images/cookindando_logo2.png"  className="mt-4" />
        <p className="mt-2 text-center text-[#C1A881]">¡Explora el mundo a través de la gastronomía y disfruta cocinando con nosotros!</p>

      </section> 

      <section className="p-10">
        <h2 className="text-3xl font-bold text-center mb-6">Recetas</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <img src="./assets/receta1.png" alt="Receta 1" className="w-full h-auto rounded-lg shadow" />
          <img src="./assets/receta2.png" alt="Receta 2" className="w-full h-auto rounded-lg shadow" />
          <img src="./assets/receta3.png" alt="Receta 3" className="w-full h-auto rounded-lg shadow" />
          <img src="./assets/receta4.png" alt="Receta 4" className="w-full h-auto rounded-lg shadow" />
          <img src="./assets/receta5.png" alt="Receta 5" className="w-full h-auto rounded-lg shadow" />
          <img src="./assets/receta6.png" alt="Receta 6" className="w-full h-auto rounded-lg shadow" />
        </div>
      </section>

     
      <section className="p-10 flex justify-center">
        <div className="w-full max-w-md">
          <h2 className="text-2xl text-center font-bold mb-6">Contáctanos</h2>
          <div className=" p-1 rounded-lg shadow-lg">
            <ContactForm />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;