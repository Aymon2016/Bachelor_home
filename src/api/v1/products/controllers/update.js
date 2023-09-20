
const productsServices = require('../../../../lib/products/index')
const update_product = async (req, res, next) => {

    const { id } = req.params
    const { name, price, description } = req.body;


    try {
        const updateData = {
            name, price, description
        }
        const product = await productsServices.update(id, updateData);

        const response = {
            code: 201,
            message: 'update products sucessfull',
            product
        };

        res.status(201).json(response);
    } catch (err) {
        next(err);
    }
};

module.exports = update_product