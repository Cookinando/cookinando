import React, { useEffect, useState } from 'react';
import { getPost } from '../services/services'; // Importa getPost desde services.js
import ContactForm from './ContactForm';
import logo from '/Users/magalylazarte/cookinando/client/src/assets/images/cookindando_logo2.png';
import img from '/Users/magalylazarte/cookinando/client/src/assets/images/img1home.png';

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getPost(); // Llama a getPost sin definir de nuevo la URL
        setPosts(data);
      } catch (error) {
        console.error('Error en la carga de posts:', error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="bg-cover bg-center min-h-screen text-white">
      <section className="p-10">
        <h1 className="text-4xl font-bold"></h1>
        <div className="flex justify-center items-center w-full h-500">
          <img src={logo} alt="logo" className="w-[600px] h-auto" />
        </div>
        <p className="mt-2 text-center text-[#C1A881]">
          ¡Explora el mundo a través de la gastronomía y disfruta cocinando con nosotros!
        </p>
      </section>

      <section className="p-10 bg-[#1B1716] rounded-lg">
        <h2 className="text-3xl font-bold text-center text-[#C1A881] mb-6">Recetas</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {posts.map((post, index) => (
            <div key={index} className="text-center">
              <img 
                src={post.image} 
                alt={post.title} 
                className="w-full h-auto rounded-lg shadow transform transition duration-300 ease-in-out hover:scale-105" 
              />
              <p className="mt-2 text-[#C1A881] font-semibold">{post.title}</p>
            </div>
          ))}
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
