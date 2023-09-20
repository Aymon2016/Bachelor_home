
const productsServices = require('../../../../lib/products/index')

const remove_product = async (req, res, next) => {

    const { id } = req.params

    try {

        const product = await productsServices.remove(id);
        if (product) {

            const response = {
                code: 204,
                message: 'Remove product sucessfull'
            };

            res.status(204).json(response);
        }
    } catch (err) {
        next(err);
    }
};

module.exports = remove_product