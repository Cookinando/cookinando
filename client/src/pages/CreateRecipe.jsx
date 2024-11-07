import React from "react";
import RecipeForm from "../components/RecipeForm";
import { useAuth } from "../context/AuthContext";
import { postNewPost } from "../services/postService";
import { useNavigate } from "react-router-dom";

const CreateRecipe = () => {
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    if (!user) {
      console.error("User not found");
      return;
    }
    try {
      if (!isAdmin) {
        console.error("User does not have the required role");
        return;
      }
      const response = await postNewPost(formData);
      console.log("Form submitted:", response);
      navigate(`/auth/recipe/${response.id}`);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

	return (
    <div className="flex min-h-full flex-col justify-center items-center lg:px-8 bg-primary text-light-dark">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-4xl">
          Registrar una receta
        </h2>
      </div>
      <RecipeForm onSubmit={handleSubmit} />
    </div>
	);
};

export default CreateRecipe;
