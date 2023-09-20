
const Product = require('../../model/Product')

const { notFound, serverError } = require('../../utilis/error')

const create = async ({ name, price, description }) => {

    const product = new Product({ name, price, description })
    await product.save()
    return product

}
const count = ({ search = '' }) => {
    const filter = {
        name: { $regex: search, $options: 'i' },
    };

    return Product.count(filter);

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
        name: { $regex: search, $options: 'i' },
    };

    const products = await Product.find(filter)
        .sort(sortStr)
        .skip(page * limit - limit)
        .limit(limit);


    return products

};

const findSingle = async (_id) => {

    const product = await Product.findById(_id)
    return product

};

const update = async (_id, updateData) => {


    const product = await Product.findById(_id)

    if (!product) {
        throw notFound('Product Not Found')
    }

    const fieldsNotToExclude = ['_id'];

    Object.keys(updateData).forEach((key) => {

        if (!fieldsNotToExclude.includes(key)) {
            if (key in product) {
                product[key] = updateData[key];
            }
        }
    });

    await product.save()
    return product

}


const remove = async (_id) => {

    const product = await findSingle(_id);

    if (!product) {
        throw notFound('Resources Not Found')
    }

    try {
        await Product.findByIdAndDelete(_id)
        return true


    } catch (error) {
        throw serverError()
    }

};

const find = async (startDate, endDate) => {

    const products = await Product.find({ createdAt: { $gte: startDate, $lte: endDate } })
    return products
}

module.exports = {
    create,
    findAll,
    count,
    findSingle,
    update,
    remove,
    find


}