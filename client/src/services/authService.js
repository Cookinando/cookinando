import axios from "axios"; 

const URL = 'http://localhost:8000/api/users';

//SERVICIO SIGNUP

export const signUpNewUser = async (data) => {
    try {
        const response = await axios.post(URL, data);
        return response.data
    } catch (error) {
        console.error('Error al registrarse:', error);
        throw error;
    }
  }


//SERVICIO LOGIN

export const loginUser = async (id) => {
    console.log(id);
    try {
      const response = await axios.get(`${URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error al logarte:', error);
      throw error;
    }
  };





