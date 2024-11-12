import axios from "axios";

const URL = "http://localhost:8000/api/users";

//READ-metodo get
export const getUsers = async () => {
  const token = localStorage.getItem("authToken");
  if (!token) {
    throw new Error("No se encontró el token en localStorage");
  }

  try {
    const response = await axios.get(URL, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error al traer los usuarios:", error);
    throw error;
  }
};

//READ-metodo get pero por ID
export const getUserById = async (id) => {
  try {
    const response = await axios.get(`${URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener el usuario:", error);
    throw error;
  }
};

//DELETE- metodo delete

export const deleteUser = async (id) => {
  const token = localStorage.getItem("authToken");

  if (!token) {
    throw new Error("No se encontró el token en localStorage");
  }

  try {
    const response = await axios.delete(`${URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error al borrar el usuario:", error);
    throw error;
  }
};

//CREATE - metodo POST
export const postNewUser = async (data) => {
  try {
    const response = await axios.post(URL, data);
    return response.data;
  } catch (error) {
    console.error("Error al crear el nuevo usuario:", error);
    throw error;
  }
};

//UPDATE . metodo put
export const updateUserProfile = async (id, data) => {
  const token = localStorage.getItem("authToken");

  if (!token) {
    throw new Error("No se encontró el token en localStorage");
  }

  console.log("Token:", token);

  if (!data.password) {
    delete data.password;
    delete data.confirmNewPassword;
  }

  try {
    const response = await axios.put(`${URL}/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error al actualizar el usuario:",
      error.response?.data || error.message
    );

    if (error.response && error.response.data && error.response.data.message) {
      return { error: error.response.data.message };
    } else {
      return { error: error.message };
    }
  }
};
