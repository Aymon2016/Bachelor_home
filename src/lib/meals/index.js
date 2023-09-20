
const Meal = require('../../model/Meal')
const { resourceConflict, notFound, serverError } = require('../../utilis/error')

const create = async ({ member_id, date, type, price, description }) => {

    const existingMeal = await Meal.findOne({ member_id: member_id, date: date, type: type })
    if (existingMeal) {
        throw resourceConflict('Meal with the same date already exists for this member')
    }
    const meal = new Meal({ member_id: member_id, date, type, price, description })
    await meal.save()
    return meal

}
const count = ({ search = '' }) => {
    const filter = {
        type: { $regex: search, $options: 'i' },
    };

    return Meal.count(filter);

};
const countByGivenMemberId = async (id) => {

    const meals = await Meal.find({ member_id: id })
    if (!meals) {
        return 0;
    }
    return meals.length;

};

const findAll = async ({
    page = defaults.page,
    limit = defaults.limit,
    sortType = defaults.sortType,
    sortBy = defaults.sortBy,
    search = defaults.search
}) => {
    const sortStr = `${sortType === 'dsc' ? '-' : ''}${sortBy}`;
    const filter = {
        description: { $regex: search, $options: 'i' },
    };

    const meals = await Meal.find(filter)
        .sort(sortStr)
        .skip(page * limit - limit)
        .limit(limit);


    return meals

};

const findSingle = async (_id) => {

    const meal = await Meal.findById(_id)
    return meal

};

const updateAndCreate = async (_id, updateData) => {

    const meal = await Meal.findById(_id)
    if (!meal) {

        throw notFound('Meal not Found')
    }

    meal.member_id = updateData.member_id || meal.member_id
    meal.type = updateData.type || meal.type
    meal.price = updateData.price || meal.price
    meal.description = updateData.description || meal.description

    await meal.save()
    return meal

}


const remove = async (_id) => {

    const meal = await Meal.findById(_id)

    if (!meal) {
        throw notFound('Resources Not Found')
    }

    try {
        const deleted = await Meal.findByIdAndDelete(_id)
        if (deleted === null) {
            return false
        } else {
            return true
        }


    } catch (error) {
        throw serverError()
    }

};

const find = async (id, startDate, endDate) => {
    const meals = await Meal.find(
        { member_id: id, createdAt: { $gte: startDate, $lte: endDate } }
    )
    return meals
}
const findWithOutId = async (startDate, endDate) => {
    const meals = await Meal.find(
        { createdAt: { $gte: startDate, $lte: endDate } }
    )
    return meals
}
const findAllOfMember = async (member_id, {
    page = defaults.page,
    limit = defaults.limit,
    sortType = defaults.sortType,
    sortBy = defaults.sortBy,


}) => {

    const sortStr = `${sortType === 'dsc' ? '-' : ''}${sortBy}`;
    const meals = await Meal.find({ member_id: member_id })
        .sort(sortStr)
        .skip(page * limit - limit)
        .limit(limit);


    return meals
}

module.exports = {
    create,
    find,
    findAll,
    count,
    findSingle,
    updateAndCreate,
    remove,
    findAllOfMember,
    countByGivenMemberId,
    findWithOutId,
}