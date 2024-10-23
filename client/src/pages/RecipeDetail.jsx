import React from 'react'

const RecipeDetail = () => {
  return (
    <>
      <h2>{title}</h2>
      <div>
        <img src={imageUrl} alt={title} />
      </div>
      <div>
        <h3>Ingredientes ({numPeople}):</h3>
        <p>{ingredients}</p>
        <h3>Preparación:</h3>
        <p>{instructions}</p>
      </div>
    </>
  )
}

export default RecipeDetail
