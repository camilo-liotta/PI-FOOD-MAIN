const {Diet} = require('../db');
const { allRecipesAPI } = require('./Controllers/recipesAPI');

const dietsDB = async (req, res) => {

    try {
        
        let existentDiets = await Diet.findAll();
        
        if(existentDiets.length === 0) {
            
            const allRecipes = await allRecipesAPI();
            
            
            const dietsNames = [];

            allRecipes.map( recipe => {
                return recipe.diets.map( singleDiet => {
                    dietsNames.includes(singleDiet) ? null : dietsNames.push(singleDiet);
                });
            });

            
            const dietsToCreate = dietsNames.map(recipeName => ({name: recipeName}));
            
            const createdDiets = await Diet.bulkCreate(dietsToCreate);
            
            existentDiets = [...existentDiets, ...createdDiets];

        }

        res.status(200).json(existentDiets);


    } catch (error) {
        res.status(404).send(error.message);
    }

}

module.exports = {dietsDB}