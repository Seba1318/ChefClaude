import React from "react";

export default function Main() {
  const [ingredients, setIngredients] = React.useState([]);

  const ingredientElements = ingredients.map((ingredient) => {
    return <li key={ingredient}>{ingredient}</li>;
  });

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

      <ul>
        {ingredientElements}
      </ul>
    </main>
  );
}