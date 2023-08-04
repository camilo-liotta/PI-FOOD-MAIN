const { apiByName, allRecipesAPI } = require('./Controllers/recipesAPI');
const { dbByName, allRecipesDB } = require('./Controllers/recipesDB');

const recipeByName = async (req, res) => {

    const {name} = req.query;                   // El nombre se pasa por query

    try {
        
        if (name === undefined) {
                
            const recipesAPI = await allRecipesAPI();
            const recipesDB = await allRecipesDB();

            const allRecipes = [...recipesAPI, ...recipesDB];
            
            res.status(200).json(allRecipes);
            
        } else {

            const coincidenciasApi = await apiByName(name);
            const coincidenciasDB = await dbByName(name);
    
            const arrayCoincidencias = [...coincidenciasApi, ...coincidenciasDB];
    
            if(arrayCoincidencias.length === 0) { throw new Error(`No existe la receta ${name}`); }
    
            res.status(200).json(arrayCoincidencias);
            
        }
 

    } catch (error) {
        res.status(404).send(error.message);
    }





}


module.exports = {recipeByName};