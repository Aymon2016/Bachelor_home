const mealsServices = require('../../../../lib/meals/index')

const updateMeal = async (req, res, next) => {

    const { id } = req.params
    const updateData = req.body;


    try {

        const meal = await mealsServices.updateAndCreate(id, updateData);

        const response = {
            code: 201,
            message: "Update meals successfull",
            data: {
                id: meal._id,
                member_id: meal.member_id,
                date: meal.date,
                type: meal.type,
                price: meal.price,
                description: meal.description,
                timestamp: {
                    createdAt: meal.createdAt,
                    updatedAt: meal.updatedAt
                }
            },
            links: {
                self: `api/v1/meals/${id}`
            }
        }
        res.status(201).json(response);
    } catch (err) {
        next(err);
    }
};

module.exports = updateMeal