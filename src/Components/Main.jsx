import React from "react";

import IngredientsList from "./IngredientsList";
import ClaudeRecipe from "./ClaudeRecipe";

export default function Main() {
  const [ingredients, setIngredients] = React.useState(
    ["all the main spices", "pasta", "ground beef", "onion", "garlic", "tomato paste", "crushed tomatoes", "beef broth"]);
  
  const [isRecipeShown, setIsRecipeShown] = React.useState(false);


  function toggleIsRecipeShown() {
    setIsRecipeShown((prevShown) => {
      return !prevShown;
    });
  }

  function addIngredient(formData) {
    const newIngredient = formData.get("ingredient");

    setIngredients((prevIngredients) => {
      return [...prevIngredients, newIngredient];
    });
  }

  return (
    <main>
      <form className="add-ingredient-form" action = {addIngredient}>
        <input type="text" placeholder="e.g. oregano" name="ingredient" required/>

        <button>Add Ingredient</button>
      </form>

      {ingredients.length > 0 ? 
      <IngredientsList
        key={ingredients.length}
        ingredients={ingredients}
        toggleIsRecipeShown={toggleIsRecipeShown}
      /> : null}

      {isRecipeShown === true ? 
      <ClaudeRecipe /> : null}
    </main>
  );
}