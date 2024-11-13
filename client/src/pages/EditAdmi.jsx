import React, { useEffect, useState } from "react";
import { updateUserProfile, getUsers } from "../services/userService.js";
import Button from "../components/Button.jsx";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const EditAdmi = () => {
  const [users, setUsers] = useState([]);
  const [tempUsers, setTempUsers] = useState([]);
  const navigate = useNavigate();

  const handleCancelClick = () => {
    navigate("/auth/profile");
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getUsers();
        console.log("Usuarios recibidos:", data);
        setUsers(data);
        setTempUsers(data);
      } catch (error) {
        console.error("Error al cargar los usuarios:", error);
      }
    };

    fetchUsers();
  }, []);

  const toggleAdmin = async (index) => {
    const updatedUsers = [...tempUsers];
    const user = updatedUsers[index];
    const newRole = user.role === "admin" ? "user" : "admin";

    updatedUsers[index] = { ...user, role: newRole };
    setTempUsers(updatedUsers);
  };

  const handleSaveSettings = async () => {
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción guardará los cambios realizados.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, guardar",
      cancelButtonText: "Cancelar",
      customClass: {
        popup: "bg-dark-light text-light",
        title: "text-light font-bold text-lg",
        htmlContainer: "text-light text-sm",
        confirmButton:
          "bg-light-dark hover:bg-green-600 text-white font-semibold py-2 px-4 rounded mr-2",
        cancelButton:
          "bg-gray-400 hover:bg-gray-500 text-white font-semibold py-2 px-4 rounded",
      },
      buttonsStyling: false,
    });

    if (result.isConfirmed) {
      try {
        for (let i = 0; i < tempUsers.length; i++) {
          const user = tempUsers[i];
          if (user.role !== users[i].role) {
            await updateUserProfile(user.id, { role: user.role });
            console.log(`Rol de ${user.username} actualizado correctamente`);
          }
        }

        Swal.fire({
          title: "¡Cambios realizados!",
          text: "Tus cambios han sido guardados con éxito.",
          icon: "success",
          customClass: {
            popup: "bg-dark-light text-light",
            title: "text-light font-bold text-lg",
            htmlContainer: "text-light text-sm",
            confirmButton:
              "bg-light-dark hover:bg-green-600 text-white font-semibold py-2 px-4 rounded",
          },
          buttonsStyling: false,
        });

        setUsers(tempUsers);

        navigate("/auth/profile");
      } catch (error) {
        console.error("Error al guardar los cambios:", error);
        Swal.fire({
          title: "Error",
          text: "Hubo un problema al guardar los cambios.",
          icon: "error",
          customClass: {
            popup: "bg-dark-light text-light",
            title: "text-light font-bold text-lg",
            htmlContainer: "text-light text-sm",
            confirmButton:
              "bg-light-dark hover:bg-green-600 text-white font-semibold py-2 px-4 rounded",
          },
          buttonsStyling: false,
        });
      }
    }
  };

  return (
    <div className="min-h-screen text-white flex flex-col items-center justify-center px-4 sm:px-8">
      <section className="w-full max-w-4xl mt-8">
        <h1 className="text-[#C1A881] text-4xl font-bold text-center mb-10">
          Gestión de Usuarios - Administradores
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {users.length > 0 ? (
            users.map((user, index) => (
              <div
                key={user.id}
                className="bg-dark-light p-6 rounded-lg flex flex-col items-center text-center"
              >
                <div className="text-xl font-semibold text-[#C1A881] mb-2">
                  {user.username}
                </div>
                <p className="text-gray-300 text-sm mb-4">{user.email}</p>
                <div className="flex items-center justify-center w-full mb-4">
                  <input
                    type="checkbox"
                    checked={tempUsers[index].role === "admin"}
                    className="hidden"
                    onChange={() => toggleAdmin(index)}
                    id={`checkbox-${index}`}
                  />
                  <label
                    htmlFor={`checkbox-${index}`}
                    className={`cursor-pointer w-8 h-8 flex items-center justify-center border-2 border-gray-300 rounded-full transition-colors duration-300 ${
                      tempUsers[index].role === "admin"
                        ? "bg-[#C1A881]"
                        : "bg-white"
                    }`}
                  >
                    {tempUsers[index].role === "admin" && (
                      <span className="text-black text-xl">✔</span>
                    )}
                  </label>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center">No hay usuarios para mostrar.</p>
          )}
        </div>
      </section>
      <div className="w-full max-w-lg flex justify-center gap-4 sm:gap-8 mt-8">
        <Button type="submit" handleClick={handleSaveSettings} text="Guardar" />
        <Button type="submit" handleClick={handleCancelClick} text="Cancelar" />
      </div>
    </div>
  );
};

export default EditAdmi;
