import React from "react";

import IngredientsList from "./IngredientsList";
import ClaudeRecipe from "./ClaudeRecipe";
import {getRecipeFromAgent} from "../ai.js";

export default function Main() {
  const [ingredients, setIngredients] = React.useState([]);
  
  const [recipe, setRecipe] = React.useState("");
  const recipeSection = React.useRef(null);

  async function getRecipe() {
    const recipeMarkdown = await getRecipeFromAgent(ingredients);

    setRecipe(recipeMarkdown);
  }

  React.useEffect(() => {
    if (recipe !== "" && recipeSection.current) {
      recipeSection.current.scrollIntoView({behavior: "smooth"});
    }
  }, [recipe]);

  function addIngredient(formData) {
    const newIngredient = formData.get("ingredient");

    setIngredients((prevIngredients) => {
      return [...prevIngredients, newIngredient];
    });
  }

  return (
    <main>
      <form className="add-ingredient-form" action={addIngredient}>
        <input type="text" placeholder="e.g. oregano" name="ingredient" required/>

        <button>Add Ingredient</button>
      </form>

      {ingredients.length > 0 ? 
        <IngredientsList
          ingredients={ingredients}
          getRecipe={getRecipe}
          ref={recipeSection}
        /> 
      : null}

      {recipe != "" ? 
        <ClaudeRecipe
          recipe={recipe}
        /> 
      : null}
    </main>
  );
}