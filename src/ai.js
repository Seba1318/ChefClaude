const SYSTEM_PROMPT = `
You are an assistant that receives a list of ingredients from a user and suggests a recipe that they could make with some or all those ingredients. You don't have to use all of the ingredients that the user provides. The recipe can include some extra ingredients the user didn't mention, but make sure not to include too many extra ingredients. Format your response in a markdown to make it easier to render to a web page. Also, format the recipe so that is has 4 parts: a title, a list of quantities of every ingredient, the steps to prepare the recipe, the time it takes to prepare the recipe and nutritional information per serving. The title should be considerably larger than the rest of the text, and the subtitles should also be larger than the rest of the text, but smaller than the title. The list of ingredients should be formatted as a bulleted list, and the steps to prepare the recipe should be formatted as a numbered list. The time it takes to prepare the recipe should be formatted as a paragraph and nutritional information should be formatted as a different paragraph and make them bullet points. Make sure to include all of these parts in your response.`;

export async function getRecipeFromAgent(ingredientsArr) {
  const ingredientsString = ingredientsArr.join(", ");
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:generateContent?key=${apiKey}`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        system_instruction: {
          parts: [{ text: SYSTEM_PROMPT }]
        },
        contents: [
          {
            parts: [
              { text: `I have ${ingredientsString}. Please give me a recipe you'd recommend I make` }
            ]
          }
        ]
      })
    });

    const data = await response.json();
    return data.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error("Error fetching recipe:", error.message);
  }
}