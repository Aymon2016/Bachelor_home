const mealsServices = require('../../../../lib/meals/index')
const validator = require('../../../../validation/index')

const createMeal = async (req, res, next) => {
    const { member_id, date, type, price, description } = req.body;


    try {
        const { isValid, error } = validator.createMeal(member_id, date, type, price, description)
        if (!isValid) {
            throw BadRequest("Bad Request")

        }
        const newMeal = await mealsServices.create({ member_id, date, type, price, description });
        const response = {
            code: 201,
            message: "Create meals successfull",
            data: {
                id: newMeal._id,
                member_id: newMeal.member_id,
                date: newMeal.date,
                type: newMeal.type,
                price: newMeal.price,
                description: newMeal.description,
                timestamp: {
                    createdAt: newMeal.createdAt,
                    updatedAt: newMeal.updatedAt
                }
            },
            links: {
                self: "api/v1/meals"
            }
        }

        res.status(201).json(response);
    } catch (err) {
        next(err);
    }
};

module.exports = createMeal


// if i want to handle account

// const session = await mongoose.startSession();
// session.startTransaction();

// try {
//     // Create a new meal within the transaction
//     const newMeal = new Meal({
//         member_id: memberId,
//         ...mealData,
//     });

//     // Save the meal within the transaction
//     await newMeal.save({ session });

//     // Update the account within the transaction
//     await Account.updateOne(
//         { _id: memberId },
//         {
//             // Update account data here
//         },
//         { session }
//     );

//     // Commit the transaction if both operations succeed
//     await session.commitTransaction();

//     // Close the session
//     session.endSession();
