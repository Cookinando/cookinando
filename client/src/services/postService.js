import axios from "axios"; 


const URL = 'https://cookinando.onrender.com/api/posts';

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
    const token = localStorage.getItem('authToken');
    const response = await axios.get(`${URL}/${id}`
      , {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error al obtener el post:', error);
    throw error;
  }
};

//DELETE- metodo delete

export const deletePost = async (id) => {
  try {
    const token = localStorage.getItem('authToken');
    const response = await axios.delete(`${URL}/${id}`
      , {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      }
    );
      return response.data
  } catch (error) {
      console.error('Error al borrar el post:', error);
      throw error;
  }
}

//CREATE - metodo POST
export const postNewPost = async (formData) => {
  try {
    const token = localStorage.getItem('authToken');
    const response = await axios.post(URL, formData, {
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error al crear el nuevo post:", error.response?.data || error.message);
    throw error;
  }
};


//UPDATE . metodo put

export const putPost = async (id, data) => {
  try {
    const token = localStorage.getItem('authToken');
    const response = await axios.put(`${URL}/${id}`, data
      , {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      }
    );
      return response.data
  } catch (error) {
      console.error('Error al actualizar el post:', error.response?.data || error.message);
      throw error;
  }
}