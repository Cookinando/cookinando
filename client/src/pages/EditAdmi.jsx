import React, { useEffect, useState } from "react";
import { updateUserProfile, getUsers } from "../services/userService.js";


const EditAdmi = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getUsers();
        console.log("Usuarios recibidos:", data);
        setUsers(data);
      } catch (error) {
        console.error("Error al cargar los usuarios:", error);
      }
    };

    fetchUsers();
  }, []);

  const toggleAdmin = async (index) => {
    const user = users[index];
    const newRole = user.role === "admin" ? undefined : "admin";

    setUsers((prevUsers) =>
      prevUsers.map((usuario, i) =>
        i === index ? { ...usuario, role: newRole } : usuario
      )
    );

    try {
      await updateUserProfile(user.id, { role: newRole });
      console.log("Rol actualizado correctamente en el servidor");
    } catch (error) {
      console.error("Error al actualizar el rol del usuario:", error);
    }
  };

  return (
    <div className="bg-[url('./assets/fondo.png')] bg-cover bg-center min-h-screen text-white">
      <section className="p-10">
        <h1 className="text-[#C1A881] text-4xl font-bold text-center">
          Gestión de Usuarios - Administradores
        </h1>
        <div className="grid grid-cols-1 gap-10 mt-10">
          <div className="p-6 rounded-lg">
            <ul className="space-y-4">
              {users.length > 0 ? (
                users.map((user, index) => (
                  <li
                    key={user.id}
                    className="flex items-center gap-x-20 text-lg justify-center"
                  >
                    <span className="text-xl">{user.username}</span>
                    <span className="text-md text-gray-300">{user.email}</span>
                    <input
                      type="checkbox"
                      checked={user.role === "admin"}
                      className="hidden"
                      onChange={() => toggleAdmin(index)}
                      id={`checkbox-${index}`}
                    />
                    <label
                      htmlFor={`checkbox-${index}`}
                      className={`cursor-pointer w-6 h-6 flex items-center justify-center border-2 border-gray-300 rounded ${
                        user.role === "admin" ? "bg-[#C1A881]" : "bg-white"
                      } transition-colors duration-300`}
                    >
                      {user.role === "admin" && (
                        <span className="text-black text-xl">✔</span>
                      )}
                    </label>
                  </li>
                ))
              ) : (
                <p className="text-center">No hay usuarios para mostrar.</p>
              )}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EditAdmi;
