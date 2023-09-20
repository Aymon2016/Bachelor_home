const Transection = require('../../model/Transection')
const { resourceConflict, notFound } = require('../../utilis/error')

const deposite = async (member_id, deposit_amount) => {

    const deposite = new Transection({ member_id: member_id, deposit_amount: deposit_amount })
    await deposite.save()

    return deposite

}


const findSingle = async (_id) => {

    const transection = await Transection.findById(_id)
    if (!transection) {
        throw notFound('No record found with this id!')
    }
    return transection

};

const update = async (_id, deposit_amount) => {


    const transection = await Transection.findById(_id)
    if (!transection) {
        throw notFound('Transection not Found')
    }
    transection.deposit_amount = deposit_amount

    await transection.save()
    return transection

}

const count = () => {
    return Transection.count();
};


const find = async (member_id, startDate, endDate) => {
    const transection = await Transection.find(
        { member_id: member_id, createdAt: { $gte: startDate, $lte: endDate } }
    )
    return transection
}

const findAllOfMember = async (member_id, {
    page = defaults.page,
    limit = defaults.limit,
    sortType = defaults.sortType,
    sortBy = defaults.sortBy,


}) => {

    const sortStr = `${sortType === 'dsc' ? '-' : ''}${sortBy}`;
    const transecton = await Transection.find({ member_id: member_id })
        .sort(sortStr)
        .skip(page * limit - limit)
        .limit(limit);


    return transecton
}

module.exports = {
    deposite,
    find,
    findSingle,
    update,
    findAllOfMember,
    count,
}