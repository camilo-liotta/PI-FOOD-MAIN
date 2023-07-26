const {Recipe} = require('../../db');
const { Op } = require('sequelize');

const dbByID = async (id) => {

    try {

        const foundRecipe = await Recipe.findByPK(id);
    
        return foundRecipe;
        
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

module.exports = { dbByID, dbByName };