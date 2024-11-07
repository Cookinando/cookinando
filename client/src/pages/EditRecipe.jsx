import React, { useEffect, useState } from "react";
import RecipeForm from "../components/RecipeForm";
import { useAuth } from "../context/AuthContext";
import { getPostById, putPost } from "../services/postService";
import { useNavigate, useParams } from "react-router-dom";

const EditRecipe = () => {
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await getPostById(id);
        setRecipe(data);
      } catch (error) {
        console.error("Error fetching recipe data:", error);
      }
    };
    loadData();
  }, [id]);

  const handleUpdate = async (formData) => {
    if (!user) {
      console.error("User not found");
      return;
    }
    try {
      if (!isAdmin) {
        console.error("User does not have the required role");
        return;
      }
      const response = await putPost(id, formData);
      console.log("Form submitted:", response);
      navigate(`/auth/recipe/${id}`);
    } catch (error) {
      console.error("Error updating form:", error);
    }
  };

	return (
    <div className="flex min-h-full flex-col justify-center items-center lg:px-8 bg-primary text-light-dark">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-4xl">
          Editar receta
        </h2>
      </div>
      <RecipeForm
        initialData={recipe}
        onSubmit={handleUpdate}
        isEditing={true} />
    </div>
	);
};

export default EditRecipe;
