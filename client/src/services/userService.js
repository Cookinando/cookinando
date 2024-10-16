import axios from "axios"; 


const URL = 'http://localhost:3000/musenion';  

//READ-metodo get
export const getUsers = async () => {
  try {
    const response = await axios.get(URL); 
    return response.data;
  } catch (error) {
    console.error('Error al traer los usuarios:', error);
    throw error;
  }
};

//READ-metodo get pero por ID
export const getUserById = async (id) => {
  try {
    const response = await axios.get(`${URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener el usuario:', error);
    throw error;
  }
};

//DELETE- metodo delete

export const deleteUser = async (id) => {
  try {
      const response = await axios.delete(`${URL}/${id}`);
      return response.data
  } catch (error) {
      console.error('Error al borrar el usuario:', error);
      throw error;
  }
}

//CREATE - metodo POST
export const postNewUser = async (data) => {
  try {
      const response = await axios.post(URL, data);
      return response.data
  } catch (error) {
      console.error('Error al crear el nuevo usuario:', error);
      throw error;
  }
}

//UPDATE . metodo put

export const putUser = async (id, data) => {
  try {
      const response = await axios.put(`${URL}/${id}`, data);
      return response.data
  } catch (error) {
      console.error('Error al actualizar el usuario:', error);
      throw error;
  }
}