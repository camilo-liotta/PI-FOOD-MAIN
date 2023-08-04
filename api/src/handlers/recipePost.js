const {Recipe, Diet} = require('../db');

const recipePost = async (req, res) => {

    const {name, summary, healthScore, steps, image, diets} = req.body;

    try {
        
        if (!name || !summary || !healthScore || !image || !diets) {
            console.log('alguno no recibe');
            throw new Error('Faltan datos');
        }

        const newRecipe = await Recipe.create({
            name,
            summary,
            healthScore,
            steps,
            image
        });


        const dietPromisesArr = diets.map( async (singleDiet) => {
            const [newDiet] = await Diet.findOrCreate({
                where: {name: singleDiet},
                defaults: {name: singleDiet}
            });

            return newDiet;

        });

        const newDiets = await Promise.all(dietPromisesArr);

        await newRecipe.addDiets(newDiets);

        res.status(200).send('Recipe created successfully');

    } catch (error) {
        console.error("Error en la creación de receta: ");
        res.tatus(400).send(error.message)
    }

}

module.exports = {recipePost};