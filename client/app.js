// src/app.js

import React, { useEffect, useState } from 'react';
import axios from 'axios'; 
import Home from './components/Home'; // Asegúrate de que la ruta sea correcta

const App = () => {
  const [recipes, setRecipes] = useState([]);
  const URL = 'http://localhost:3000/cookinando';

  // Método para obtener recetas
  const getRecipes = async () => {
    try {
      const response = await axios.get(URL); // Hacer la solicitud GET
      return response.data; // Retornar los datos obtenidos
    } catch (error) {
      console.error('Error al obtener las recetas:', error);
      throw error; // Lanzar el error para manejarlo más tarde
    }
  };

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const data = await getRecipes(); 
        setRecipes(data); 
      } catch (error) {
        console.error('Error al cargar las recetas:', error);
      }
    };

    fetchRecipes(); // Llamar a la función cuando se monta el componente
  }, []);

  return (
    <div>
      <Home recipes={recipes} /> 
    </div>
  );
};

export default App;
