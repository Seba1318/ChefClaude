export default function IngredientsList(props) { 
  const ingredientElements = props.ingredients.map((ingredient) => {
    return <li key={ingredient}>{ingredient}</li>;
  });

  return (
    <section>
      <h2>Ingredients on hand:</h2>

      <ul className="ingredients-list">{ingredientElements}</ul>

      {props.ingredients.length > 3 ? 
      <div className="get-recipe-container">
        <div className="get-recipe-text-container">
          <h3>Ready for a recipe?</h3>
          <p>Get a recipe based on your list of ingredients.</p>
        </div>

        <button className="get-recipe-button" onClick={props.toggleIsRecipeShown}>Get a recipe</button>
      </div> : null}
    </section>
  );
}