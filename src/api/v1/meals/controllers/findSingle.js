
const mealsServices = require('../../../../lib/meals/index')
const { notFound } = require('../../../../utilis/error')

const findSingle = async (req, res, next) => {
    const { id } = req.params
    try {


        const meal = await mealsServices.findSingle(id)

        if (meal === null) {
            throw notFound('Meal Not Found')
        }
        const response = {
            code: 200,
            message: "Meal retrieved successfully",
            data: {
                id: meal._id,
                member_id: meal.member_id,
                date: meal.date,
                type: meal.type,
                price: meal.price,
                description: meal.description,
                timestamp: {
                    createdAt: meal.createdAt,
                    updatedAt: meal.updatedAt,
                }
            },
            links: {
                self: `api/v1/meals/${id}`
            }
        }
        res.status(200).json(response);
    } catch (err) {
        next(err);
    }
};

module.exports = findSingle