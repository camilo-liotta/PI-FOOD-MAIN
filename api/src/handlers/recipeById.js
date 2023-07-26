const {apiByID} = require('./Controllers/recipesAPI');
const {dbByID} = require('./Controllers/recipesDB');

const recipeById = async (req, res) => {

    const {id} = req.params;                        // El id se pasa por params

    var recipeFound;
    var recipeName;                                 // Se crea recipeName porque en la base de datos existe la prop name
                                                    // pero en la api es title
    try {

        if (isNaN(id)) {                            // Si no es un numero quiere decir que es UUIDv4 y se busca en la DB
            
            recipeFound = await dbByID(id);
            recipeName = recipeFound.name;

        } else {                                    // Si es un numero se busca en la api
            
            recipeFound = await apiByID(id);
            recipeName = recipeFound.title;

        }

        if( !recipeFound ) throw new Error(`No existe un personaje de ID ${id}`);


        //TODO Se ordenan los steps ya que vienen en objetos individuales con mucha informacion

        let recipeSteps = recipeFound.analyzedInstructions[0];
        recipeSteps = recipeSteps.steps;

        recipeSteps = recipeSteps.map( singleStep => {
            return(`Step ${singleStep.number}: ${singleStep.step}`);
        });

        // Se manda solo la informacion requerida en un objeto recipe 

        const recipe = {
            id: recipeFound.id,
            name: recipeName,
            summary: recipeFound.summary.replace(/<[^>]+>/g, ""),
            steps: recipeSteps,
            diets: recipeFound.diets,
            image: recipeFound.image
        }

        res.status(200).json(recipe);

    } catch (error) {
        res.status(404).send(error.message);     
    }

}

module.exports = {recipeById};