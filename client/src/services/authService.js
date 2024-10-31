import axios from "axios"; 

const URL = 'http://localhost:8000/api/users';

//SERVICIO SIGNUP

export const signUpNewUser = async (data) => {
    try {
        const response = await axios.post(`${URL}/signup`, data);
        return response.data
    } catch (error) {
        console.error('Error al registrarse:', error);
        throw error;
    }
  }


//SERVICIO LOGIN

export const loginUser = async (data) => {
  try {
    console.log(data);
    const response = await axios.post(`${URL}/login`, data, {
      headers: { 'Content-Type': 'application/json' },
    });

    const userData = response.data;
    return { success: true, userData };

  } catch (error) {
    let errorMessage;

    if (error.response && error.response.status === 404) {
      errorMessage = "Ups... Parece que no estás registrado.";
    } else if (error.response && error.response.status === 401) {
      errorMessage = "Usuario o contraseña incorrectos.";
    } else {
      errorMessage = error.message;
    }

    return { success: false, message: errorMessage };
  }
};