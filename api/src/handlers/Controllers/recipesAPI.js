require('dotenv').config();
const { API_KEY } = process.env;
const axios = require('axios');

const allRecipesAPI = async () => {
   
    try {
        
        const apiRequest = await axios.get(
            `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`
        );
        
        const apiData = apiRequest.data.results;
        
        const recipes = apiData.map( recipe => {
            
            return {
                id: recipe.id,
                name: recipe.title.toLowerCase(),
                summary: recipe.summary,
                healthScore: recipe.healthScore,
                steps: recipe.analyzedInstructions.map(instruction => {
                    return instruction.steps.map( singleStep => {
                        return(`Step ${singleStep.number}: ${singleStep.step}`);
                    })
                }).flat(),
                image: recipe.image,
                diets: recipe.diets ? recipe.diets : "there aren't diets",
                createdInDb: false
            }
        });

        return(recipes);

    } catch (error) {
        throw new Error(error.message);
    }

}

const apiByID = async (id) => {

    try {
        
        var foundRecipe = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`);
        
        if(!foundRecipe) { throw new Error('error en la API') }

        const recipeData = foundRecipe.data;
        // console.log(recipeData);
        return(recipeData);

    } catch (error) {
        throw new Error(error.message);
    }

}

const apiByName = async (name) => {

    try {
        
        const everyApiRecipe = await allRecipesAPI();
        if(!everyApiRecipe) throw new Error('error en la API');
        
        const coincidencias = [];
        
        everyApiRecipe.forEach( recipe => {           
            if (recipe.name.includes(name.toLowerCase())) {
                coincidencias.push(recipe);
            }
        })
        
        return(coincidencias);

    } catch (error) {
        throw new Error(error.message);
    }

}

module.exports = { allRecipesAPI, apiByID, apiByName };