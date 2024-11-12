import { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { FaSquarePlus } from "react-icons/fa6";
import { FaSquareMinus } from "react-icons/fa6";
import Button from "./Button";

const RecipeForm = ({ onSubmit, initialData = {}, isEditing = false }) => {
  const { register, handleSubmit, setValue, control, formState: { errors } } = useForm({
    defaultValues: initialData,
  });

  const [imageFile, setImageFile] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  
  const { fields: ingredientFields, append: addIngredient, remove: removeIngredient } = useFieldArray({
    control,
    name: "ingredients",
  });
  
  const { fields: instructionFields, append: addInstruction, remove: removeInstruction } = useFieldArray({
    control,
    name: "instructions",
  });

  useEffect(() => {
    if (isEditing && initialData) {
      setValue("title", initialData.title);
      setValue("numPeople", initialData.numPeople);
      setValue("ingredients", initialData.ingredients || []);
      setValue("instructions", initialData.instructions || []);
    }
  }, [isEditing, initialData, setValue]);

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleFormSubmit = async (data) => {
    setSubmitted(true);
    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("numPeople", data.numPeople);
      data.ingredients.forEach((ingredient, index) => formData.append(`ingredients[${index}]`, ingredient));
      data.instructions.forEach((instruction, index) => formData.append(`instructions[${index}]`, instruction));
      if (imageFile) {
        formData.append("image", imageFile);
      }
      await onSubmit(formData);
    } catch (error) {
      console.error("Error sending recipe:", error);
    }
  };

  return (
    <div className="mt-10 mb-12 mx-16 font-normal flex flex-col justify-center items-center sm:my-14">
      <form
        id="recipeForm"
        className="space-y-6 flex flex-col gap-4"
        onSubmit={handleSubmit(handleFormSubmit)} encType="multipart/form-data">
        <div>
          <label className="text-xl leading-6 text-light">Nombre de la receta</label>
          <input
            id="title"
            {...register("title", { required: "El nombre de la receta es requerido." })}
            placeholder="Ingrese el nombre de la receta"
            className="w-full h-[3.25rem] px-4 text-black"
          />
          {errors.title && <span className="text-red-500 text-sm mt-1">{errors.title.message}</span>}
        </div>

        <div>
          <label className="text-xl leading-6 text-light">Número de personas</label>
          <input
            id="numPeople"
            type="number"
            min="1"
            {...register("numPeople", { required: "El número de personas es requerido. Mínimo 1.", min: 1 })}
            placeholder="¿Para cuántas personas es la receta?"
            className="w-full h-[3.25rem] px-4 text-black"
          />
          {errors.numPeople && <span className="text-red-500 text-sm mt-1">{errors.numPeople.message}</span>}
        </div>

        <div>
          <label className="text-xl leading-6 text-light">Ingredientes</label>
          {ingredientFields.map((field, index) => (
            <div key={field.id} className="mt-2">
              <div className="flex gap-1 items-center mb-2 bg-white">
                <input
                  {...register(`ingredients.${index}`, { required: `El campo ingrediente ${index + 1} es requerido.` })}
                  placeholder={`Ingrediente ${index + 1}`}
                  className="w-full h-[2.25rem] px-4 text-black"
                />
                <button type="button" onClick={() => removeIngredient (index)} className="flex gap-1 items-center text-xs text-red-700 mr-1">Eliminar<FaSquareMinus className="text-3xl" /></button>
              </div>
              {errors.ingredients && errors.ingredients[index] && <span className="text-red-500 text-sm mt-1">{errors.ingredients[index].message}</span>}
            </div>
          ))}
          <button type="button" onClick={() => addIngredient("")} className="flex gap-1 items-center mt-2"><FaSquarePlus /> Añadir Ingrediente</button>
          {(ingredientFields.length === 0 && submitted) && <span className="text-red-500 text-sm mt-1">Debes añadir al menos un ingrediente</span>}
        </div>

        <div>
          <label className="text-xl leading-6 text-light">Preparación</label>
          {instructionFields.map((field, index) => (
            <div key={field.id} className="mt-2">
              <div className="flex gap-1 items-center mb-2 bg-white">
                <input
                  {...register(`instructions.${index}`, { required: `El campo instrucción ${index + 1} es requerido.` })}
                  placeholder={`Instrucción ${index + 1}`}
                  className="w-full h-[2.25rem] px-4 text-black"
                />
                <button type="button" onClick={() => removeInstruction(index)} className="flex gap-1 items-center text-xs text-red-700 mr-1">Eliminar<FaSquareMinus className="text-3xl" /></button>
              </div>
              {errors.instructions && errors.instructions[index] && <span className="text-red-500 text-sm mt-1">{errors.instructions[index].message}</span>}
            </div>
          ))}
          <button type="button" onClick={() => addInstruction("")} className="flex gap-1 items-center mt-2"><FaSquarePlus /> Añadir Instrucción</button>
          {(instructionFields.length === 0 && submitted) && <span className="text-red-500 text-sm mt-1">Debes añadir al menos una instrucción</span>}
        </div>

        <div>
          <label className="text-xl leading-6 text-light">Subir imagen</label>
          <input type="file" accept="image/*" onChange={handleImageChange} className="w-full" />
        </div>

        <Button type="submit" text={isEditing ? "Actualizar Receta" : "Crear Receta"} handleClick={handleSubmit(handleFormSubmit)} />
      </form>
      {/* {submitted && <p>Receta enviada con éxito.</p>} */}
    </div>
  );
};

export default RecipeForm;
