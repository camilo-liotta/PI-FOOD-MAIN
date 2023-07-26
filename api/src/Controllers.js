const {api_key} = process.env;
const {Recipe, Diet} = require('./db');
const axios = require('axios');

const getAllApi = async (req, res) => {
    try {
        const allDataApi = await axios.get(
            `https://api.spoonacular.com/recipes/complexSearch?apiKey=${api_key}&number=100&addRecipeInformation=true`
        );
        res.status(200).json(allDataApi.data);
    } catch (error) {
        res.status(404).json(error.message);
    }
}

const getApi = async (req, res) => {
    try {
        const apiResponse = await axios.get(
            `https://api.spoonacular.com/recipes/complexSearch?apiKey=${api_key}&number=100&addRecipeInformation=true`
        );
        
        const dataApi = apiResponse.data;
        const results = dataApi.results;

        const recipesDB = await Recipe.findAll({
            include: [{
                model:Diet,
                attributes:["name"]
            }]
        });

        const apiMap = results.map(element => {
            let steps = element.analyzedInstructions.steps;
            let step = steps.map( elementStep => {
                return (`Paso ${elementStep.number}: ${elementStep.step}.`)
            });

            // let step = element.analyzedInstructions.map( elementStep => {
            //     return elementStep.steps.map( realStep => {
            //         return (`Paso ${realStep.number}: ${realStep.step}.`)
            //     });
            // });

            return({
                id: element.id,
                name: element.title.toLowerCase(),
                summary: element.summary.replace(/<[^>]+>/g, ""),
                healthScore: element.healthScore,
                steps: step[0],
                diets: element.diets.map( dieta => {
                    return {
                        name:dieta
                    }
                }),
                image: element.image,
                createdInDb: false
            })

        });

        const allRecipes = [...recipesDB, ...apiMap];

        const arrConj = allRecipes.map( i => {
            const arrDiets = i.diets.map( diet => {
                return(diet.name);
            });

            return {
                id: i.id,
                name: i.name.toLowerCase(),
                summary: i.summary,
                healthScore: i.healthScore,
                steps: i.steps,
                diets: arrDiets,
                image: i.img,
                createdInDb: i.createdInDb
            }
        });
        // console.log(arrConj);
        return (arrConj);

    } catch (error) {
        return(Error(error));
    }
}

const getById = async(id) => {
    try {
        
        const recipe = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${api_key}`);
        const recipeData = recipe.data;
        const allSteps = recipeData.analyzedInstructions.map( instructions => {
            return instructions.steps.map( anInstruction => {
                return(`Step ${anInstruction.number}: ${anInstruction.step}.`);
            });
        });

        const allData = {
            id: recipeData.id,
            name: recipeData.name,
            summary: recipeData.summary.replace(/<[^>]+>/g, ""),
            healthScore: recipeData.healthScore,
            steps: allSteps[0],
            diets: recipeData.diets,
            image: recipeData.image
        };

        return(allData);

    } catch (error) {
        return Error(error);
    }
}

const getByIdDb = async (arg) => {
    try {
        
        let recipeDB = await Recipe.findByPk(arg, {
            include:Diet
        });

        return ({
            id: recipeDB.id,
            name: recipeDB.name.toLowerCase(),
            summary: recipeDB.summary,
            healthScore:recipeDB.healthScore,
            steps: [recipeDB.steps],
            image: recipeDB.image,
            diets: recipeDB.diets.map(diet=>{
                return(diet.name);
            })
        });

    } catch (error) {
        return(Error(error));
    }
}

const getByName = async (arg) => {
    try {
        const allData = await getApi();
        const nameApi = allData.filter(element => { element.title.toLocaleLowerCase().includes(arg.toLocaleLowerCase()) });
        
        return(nameApi);

    } catch (error) {
        return(Error(error));
    }
}

const getDiets = async () => {
    let diets = ["dairy free","gluten free","lacto ovo vegetarian","vegan","pescatarian","paleolithic","primal","whole 30"];
    try {
        const dietTypes = diets.map( async dieta => {
            return await Diet.findOrCreate({
                where:{name:dieta},
                defaults:{
                    name:dieta
                }
            });
        });
    } catch (error) {
        return(Error(error));
    }
}

module.exports = {
    getApi,
    getById,
    getByName,
    getByIdDb,
    getAllApi,
    getDiets,
}