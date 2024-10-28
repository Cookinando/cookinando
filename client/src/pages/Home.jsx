// Home.jsx

import React from 'react';
import ContactForm from '../components/ContactForm'; 
import logo from '/Users/magalylazarte/cookinando/client/src/assets/images/cookindando_logo2.png';
import img from '/Users/magalylazarte/cookinando/client/src/assets/images/img1home.png';
import ensalada from '/Users/magalylazarte/cookinando/client/src/assets/ensalada.png';
import noodles from '/Users/magalylazarte/cookinando/client/src/assets/Noodles.png';
import raviolis from '/Users/magalylazarte/cookinando/client/src/assets/raviolis.png';
import costillascerdo from '/Users/magalylazarte/cookinando/client/src/assets/costillascerdo.png';
import costillas from '/Users/magalylazarte/cookinando/client/src/assets/costillas.png';
import guiso from '/Users/magalylazarte/cookinando/client/src/assets/guiso.png';

const Home = () => {
  return (
    <div className="bg-[url('/Users/magalylazarte/cookinando/client/src/assets/fondo.png')] bg-cover bg-center min-h-screen text-white">
      <section className="p-10">
        <h1 className="text-4xl font-bold"></h1>
        <div className="flex justify-center items-center w-full h-500">
          <img 
            src={logo} 
            alt="logo" 
            className="w-[600px] h-auto" 
          /> 
        </div>
        <p className="mt-2 text-center text-[#C1A881]">
          ¡Explora el mundo a través de la gastronomía y disfruta cocinando con nosotros!
        </p>
      </section> 

      <section className="p-10 flex justify-center flex-col md:flex-row items-center">
  <div className="flex flex-col justify-center space-y-4 mr-4">
    <div className="bg-[#BEBDA7] p-4 rounded-lg shadow w-full md:w-[300px] mt-20">
      <h3 className="text-xl font-bold mb-2"></h3>
      <p>Somos un blog de cocina donde encontrarás una amplia variedad de recetas de diferentes países.</p>
    </div>
    <div className="bg-[#C1A881] p-5 rounded-lg shadow w-full md:w-[300px] mt-4">
      <h3 className="text-xl font-bold mb-6"></h3>
      <p>Aquí podrás descubrir platos tradicionales, sabores exóticos y nuevas ideas culinarias para sorprender a tus seres queridos.</p>
    </div>
  </div>
  <div className="flex justify-center md:justify-end"> 
    <img 
      src={img} 
      alt="img" 
      className="w-full md:w-[600px] h-auto" 
    /> 
  </div>
</section>


      <section className="p-10 bg-[#1B1716] rounded-lg">
  <h2 className="text-3xl font-bold text-center text-[#C1A881] mb-6">Recetas</h2>
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
    <div className="text-center">
      <img 
        src={ensalada} 
        alt="ensalada" 
        className="w-full h-auto rounded-lg shadow transform transition duration-300 ease-in-out hover:scale-105" 
      />
      <p className="mt-2 text-[#C1A881] font-semibold">Ensalada fresca</p>
    </div>
    <div className="text-center">
      <img 
        src={noodles} 
        alt="noodles" 
        className="w-full h-auto rounded-lg shadow transform transition duration-300 ease-in-out hover:scale-105" 
      />
      <p className="mt-2 text-[#C1A881] font-semibold">Noodles con gambas</p>
    </div>
    <div className="text-center">
      <img 
        src={raviolis} 
        alt="raviolis" 
        className="w-full h-auto rounded-lg shadow transform transition duration-300 ease-in-out hover:scale-105" 
      />
      <p className="mt-2 text-[#C1A881] font-semibold">Raviolis de espinacas</p>
    </div>
    <div className="text-center">
      <img 
        src={costillascerdo} 
        alt="costillascerdo" 
        className="w-full h-auto rounded-lg shadow transform transition duration-300 ease-in-out hover:scale-105" 
      />
      <p className="mt-2 text-[#C1A881] font-semibold">Costillas de cerdo</p>
    </div>
    <div className="text-center">
      <img 
        src={costillas} 
        alt="costillas" 
        className="w-full h-auto rounded-lg shadow transform transition duration-300 ease-in-out hover:scale-105" 
      />
      <p className="mt-2 text-[#C1A881] font-semibold">Costillas BBQ</p>
    </div>
    <div className="text-center">
      <img 
        src={guiso} 
        alt="guiso" 
        className="w-full h-auto rounded-lg shadow transform transition duration-300 ease-in-out hover:scale-105" 
      />
      <p className="mt-2 text-[#C1A881] font-semibold">Guiso de carne</p>
    </div>
  </div>
</section>

      <section className="p-10 flex justify-center">
        <div className="w-full max-w-md">
          <h2 className="text-2xl text-center font-bold text-[#C1A881] mb-6">Contáctanos</h2>
          <div className="p-1 rounded-lg shadow-lg">
            <ContactForm />
          </div>
        </div>
      </section>
    </div>
  );
};



export default Home;
