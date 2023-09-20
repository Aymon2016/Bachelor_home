
const mealsServices = require('../../../../lib/meals/index')

const removeMeal = async (req, res, next) => {

    const { id } = req.params;
    try {

        const meal = await mealsServices.remove(id)

        const response = {
            code: 204,
            message: "Meal deleted successful"
        }

        res.status(204).json(response);

    } catch (err) {
        next(err);
    }
};

module.exports = removeMeal