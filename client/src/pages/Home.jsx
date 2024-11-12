import React, { useEffect, useState } from 'react';
import { getPost } from '../services/postService';
import ContactForm from '../components/ContactForm';
import logo from '../assets/images/cookindando_logo2.png';
import img from '../assets/images/img1home.png';
import iconplato from '../assets/images/iconplato.svg';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getPost();
        setPosts(data);
      } catch (error) {
        console.error('Error al cargar los posts:', error);
      }
    };

    fetchPosts();
  }, []);

  const onClickRecipe = (id) => {
    navigate(`auth/recipe/${id}`);
  };

  return (
    <div className="bg-cover bg-center min-h-screen text-white mb-8">
      <section className="px-10 pt-10 md:p-10">
        <h1 className="text-4xl font-bold"></h1>
        <div className="flex justify-center items-center w-full h-500">
          <img src={logo} alt="logo" className="w-[600px] h-auto" />
        </div>
        <p className="mt-2 text-center text-light-dark">
          ¡Explora el mundo a través de la gastronomía y disfruta cocinando con nosotros!
        </p>
      </section>
      
      <section className="p-10 flex justify-center flex-col md:flex-row items-center">
        <div className="flex flex-col justify-center ">
          <div className="bg-light p-4 shadow w-full md:w-[300px] md:mt-20">
            <h3 className="text-xl font-bold mb-2"></h3>
            <p>Somos un blog de cocina donde encontrarás una amplia variedad de recetas de diferentes países.</p>
          </div>
          <div className="bg-light-dark p-5 shadow w-full md:w-[300px] mt-4">
            <h3 className="text-xl font-bold mb-2"></h3>
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

      {/* Sección de Recetas */}
      <section className="p-10 pt-16 bg-dark rounded-lg my-12 sm:p-16 md:mt-20 lg:px-20">
        <h2 className="text-4xl font-bold text-center text-light-dark mb-6">Recetas</h2>
        <div className="grid grid-cols-1 w-4/5 mx-auto sm:grid-cols-2 md:grid-cols-3 gap-6 my-8 mt-14 sm:w-full">
          {posts.map((post, index) => (
            <div key={index} className="text-center transform transition duration-300 ease-in-out hover:scale-105 xl:mx-6"
            onClick={() => onClickRecipe(post.id)}
            >
              <div>
                <img 
                  src={post.imageUrl ? post.imageUrl : iconplato} // Usa la URL de la imagen de cada receta
                  alt={post.title} 
                  className="w-full h-auto inline object-cover rounded-lg shadow sm:h-full sm:w-auto" 
                />
              </div>
              <p className="mt-4 text-light text-lg">{post.title}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="p-10 flex justify-center">
        <div className="w-full max-w-md">
          <h2 className="text-2xl text-center font-bold text-light-dark mb-6">Contáctanos</h2>
          <div className="p-1 rounded-lg shadow-lg">
            <ContactForm />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
