const {Recipe, Diet} = require('../../db');
const { Op } = require('sequelize');

const allRecipesDB = async () => {

    try {
        
        const recipes = await Recipe.findAll({
            include: {
                model: Diet,
                attributes: ['name']
            }
        })


        const recipesWithDiets = recipes.map(recipe => ({
            id: recipe.dataValues.id,
            name: recipe.dataValues.name,
            summary: recipe.dataValues.summary,
            healthScore: recipe.dataValues.healthScore,
            image: recipe.dataValues.image,
            steps: recipe.dataValues.steps,
            createdInDb: true,
            diets: recipe.dataValues.diets.map(diet => diet.name),
        }));


        return recipesWithDiets;


    } catch (error) {
        throw new Error(error.message);
    }

}


const dbByID = async (id) => {

    try {

        console.log('aca tambien entro!');

        const recipe = await Recipe.findByPk(id, {
            include: {
              model: Diet,
              attributes: ['name'], // Puedes especificar los atributos de Diet que deseas obtener
            },
        });

        const { name, summary, healthScore, steps, image, createdInDb, diets } = recipe.dataValues;
        const dietsArray = diets.map(diet => diet.name);

        const result = {
            name,
            summary,
            healthScore,
            steps,
            image,
            createdInDb,
            diets: dietsArray,
        };
    
        return result;
        
    } catch (error) {
        throw new Error(error.message)
    }


}

const dbByName = async (name) => {

    try {

        const recipes = await Recipe.findAll({
            where:{
                name: {
                    [Op.like]: `%${name}%`
                }
            }
        })

        return recipes;
        
    } catch (error) {
        throw new Error(error.message)
    }

}

module.exports = { dbByID, dbByName, allRecipesDB };