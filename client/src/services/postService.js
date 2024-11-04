import axios from "axios"; 


const URL = 'http://localhost:8000/api/posts';

//READ-metodo get
export const getPost = async () => {
  try {
    const response = await axios.get(URL); 
    return response.data;
  } catch (error) {
    console.error('Error al traer los posts:', error);
    throw error;
  }
};

//READ-metodo get pero por ID
export const getPostById = async (id) => {
  try {
    const response = await axios.get(`${URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener el post:', error);
    throw error;
  }
};

//DELETE- metodo delete

export const deletePost = async (id) => {
  try {
      const response = await axios.delete(`${URL}/${id}`);
      return response.data
  } catch (error) {
      console.error('Error al borrar el post:', error);
      throw error;
  }
}

//CREATE - metodo POST
export const postNewPost = async (formData) => {
  try {
    const response = await axios.post(URL, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error al crear el nuevo post:", error);
    throw error;
  }
};


//UPDATE . metodo put

export const putPost = async (id, data) => {
  try {
      const response = await axios.put(`${URL}/${id}`, data);
      return response.data
  } catch (error) {
      console.error('Error al actualizar el post:', error);
      throw error;
  }
}