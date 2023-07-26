const {Recipe, Diet} = require('../db');

const recipePost = async (req, res) => {

    const {name, summary, healthScore, steps, image, diets} = req.body;

    try {
        
        if (!name || !summary || !healthScore || !image || !diets) {
            res.status(404).send('Faltan datos')
        }

        const newRecipe = await Recipe.create({
            name,
            summary,
            healthScore,
            steps,
            image
        })


        diets.forEach( async (diet) => {

            const newDiet = await Diet.findOrCreate({
                where: {name: diet},
                defaults: {name:diet}
            });

            newRecipe.addDiet(newDiet);

        });

        res.status(200).send('Recipe created successfully');

    } catch (error) {
        throw new Error(error.message);
    }

}


module.exports = {recipePost};