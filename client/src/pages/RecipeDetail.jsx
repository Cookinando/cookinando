import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPostById, deletePost } from "../services/postService";
import { useAuth } from "../context/AuthContext";
import Button from "../components/Button";
import DeleteButton from "../components/DeleteButton";
import Swal from "sweetalert2";

const RecipeDetail = () => {
  const { isAuthenticated, isAdmin, user } = useAuth();
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        if (isAuthenticated) {
          const data = await getPostById(id);
          setPost(data);
        }
      } catch (error) {
        console.error("Error fetching post:", error);
      } finally {
        return setLoading(false);
      }
    };

    fetchPost();
  }, [id, isAuthenticated]);

  const handleEditButton = () => navigate(`/auth/admin/recipe/${id}/edit`);

  const handleDeleteButton = async () => {
    const result = await Swal.fire({
      title: "¿Estás seguro de que quieres eliminar esta receta?",
      text: "Esta acción eliminará esta receta permanentemente.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar receta",
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
        await deletePost(id);

        Swal.fire({
          title: "¡Receta eliminada!",
          text: `La receta de ${post.title} ha sido eliminada con éxito.`,
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

        navigate("/");
      } catch (error) {
        console.error("Error al eliminar la receta:", error);
        Swal.fire({
          title: "Error",
          text: "Hubo un problema al eliminar la receta.",
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

  if (!post) return <div>No se encontró la receta.</div>;

  return (
    <div className="md:w-5/6 mx-auto mt-10 mb-14">
      <h2 className="text-light-dark font-semibold text-5xl sm:text-7xl text-center my-6">
        {post.title}
      </h2>
      <div
        className={`bg-light text-dark ${
          post.imageUrl ? "mt-44 md:mt-80" : "mt-20"
        } pb-16 flex flex-col gap-8`}
      >
        {post.imageUrl && (
          <div className="text-light -mt-32 md:-mt-64 mx-auto w-4/5 md:w-4/6 md:h-[450px] md:mr-0 self-end">
            <img
              src={post.imageUrl}
              alt={post.title}
              className="object-cover object-center shadow-lg w-full h-full"
            />
          </div>
        )}
        <div className="mx-auto px-10 sm:px-16 md:px-20 lg:px-52">
          <h3 className="text-2xl my-8 sm:text-4xl">
            Ingredientes ({post.numPeople} personas):
          </h3>
          <ul className="list-disc px-4">
            {post.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
          <h3 className="text-2xl my-8 sm:text-4xl">Preparación:</h3>
          <ol className="list-decimal px-4">
            {post.instructions.map((instruction, index) => (
              <li key={index}>{instruction}</li>
            ))}
          </ol>
        </div>
      </div>
      {isAdmin && user.id === post.authorId && (
        <div className="flex flex-col justify-between w-4/5 mx-auto pt-12 gap-48 max-md:gap-4 max-lg:gap-24 md:flex-row md:w-full">
          <Button
            text="Editar Receta"
            type="button"
            handleClick={handleEditButton}
          />
          <DeleteButton
            text="Eliminar Receta"
            type="button"
            handleClick={handleDeleteButton}
          />
        </div>
      )}
    </div>
  );
};

export default RecipeDetail;
