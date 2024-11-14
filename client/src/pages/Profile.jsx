import React from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import DeleteButton from "../components/DeleteButton.jsx";
import { deleteUser } from "../services/userService.js";
import Swal from "sweetalert2";

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleEditClick = () => {
    navigate("edit");
  };

  const handlePostRecipe = () => {
    navigate("/auth/admin/newrecipe");
  };

  const handleEditUsersRole = () => {
    navigate("/auth/admin/editadmin");
  };

  const handleDeleteAccount = async () => {
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción eliminará tu cuenta permanentemente.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar cuenta",
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
        await deleteUser(user.id);

        Swal.fire({
          title: "¡Cuenta eliminada!",
          text: "Tu cuenta ha sido eliminada con éxito.",
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

        logout();
        navigate("/login");
      } catch (error) {
        console.error("Error al eliminar la cuenta:", error);
        Swal.fire({
          title: "Error",
          text: "Hubo un problema al eliminar la cuenta.",
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
    <div className="flex min-h-full flex-col justify-center items-center lg:px-8 bg-primary p-4 pb-10">
      {user?.role === "admin" ? (
        <div className="w-full max-w-lg flex flex-col items-center">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm mb-8">
            <h2 className="mt-10 text-center text-4xl text-light-dark">
              ¡Hola {user?.username}!
            </h2>
          </div>
          <div className="mt-10 gap-5 sm:mx-auto sm:w-full sm:max-w-sm font-normal flex flex-col items-center">
            <Button
              type="submit"
              handleClick={handleEditClick}
              text="Editar perfil"
            />
            <Button
              type="submit"
              handleClick={handlePostRecipe}
              text="Subir receta"
            />
            <Button
              type="submit"
              handleClick={handleEditUsersRole}
              text="Editar usuarios"
            />
            <DeleteButton
              type="submit"
              handleClick={handleDeleteAccount}
              text="Eliminar cuenta"
            />
          </div>
        </div>
      ) : (
        <div className="w-full max-w-2xl flex flex-col items-center">
          <h2 className="mt-10 text-center text-3xl md:text-4xl text-light-dark w-full">
            Información de usuario
          </h2>
          <div className="flex flex-col justify-center items-center px-4 md:px-12 pt-8 pb-8 w-full">
            <div className="mb-8 flex flex-col justify-center items-center gap-3 bg-light-dark p-8 md:p-12 shadow-lg w-full max-w-lg">
              <ul className="list-disc flex flex-col gap-4 items-start text-lg px-4 md:px-10">
                <li>
                  <h3 className="font-bold">Nombre de usuario:</h3>
                </li>
                <p>{user?.username}</p>
                <li>
                  <h3 className="font-bold">Correo electrónico:</h3>
                </li>
                <p>{user?.email}</p>
              </ul>
            </div>
          </div>
          <div className="w-full max-w-lg flex justify-center gap-4 sm:gap-8 px-4">
            <Button
              type="submit"
              handleClick={handleEditClick}
              text="Editar perfil"
            />
            <DeleteButton
              type="submit"
              handleClick={handleDeleteAccount}
              text="Eliminar cuenta"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
