


const Notice = require('../../model/Notice')

const { notFound, serverError } = require('../../utilis/error')

const create = async ({ title, body }) => {

    const notice = new Notice({ title, body })
    await notice.save()
    return notice

}
const count = ({ search = '' }) => {
    const filter = {
        title: { $regex: search, $options: 'i' },
    };

    return Notice.count(filter);

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
        title: { $regex: search, $options: 'i' },
    };

    const notices = await Notice.find(filter)
        .sort(sortStr)
        .skip(page * limit - limit)
        .limit(limit);


    return notices

};

const findSingle = async (_id) => {

    const notice = await Notice.findById(_id)
    return notice

};

const update = async (_id, updateData) => {


    const notice = await Notice.findById(_id)

    if (!notice) {
        throw notFound('Notice Not Found')
    }

    const fieldsNotToExclude = ['_id'];

    Object.keys(updateData).forEach((key) => {

        if (!fieldsNotToExclude.includes(key)) {
            if (key in notice) {
                notice[key] = updateData[key];
            }
        }
    });

    await notice.save()
    return notice

}


const remove = async (_id) => {

    const notice = await findSingle(_id);

    if (!notice) {
        throw notFound('Resources Not Found')
    }

    try {
        await Notice.findByIdAndDelete(_id)
        return true


    } catch (error) {
        throw serverError()
    }

};



module.exports = {
    create,
    findAll,
    count,
    findSingle,
    update,
    remove,


}