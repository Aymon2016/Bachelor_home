
const productsServices = require('../../../../lib/products/index')
const { notFound } = require('../../../../utilis/error')

const findSingle = async (req, res, next) => {

    const { id } = req.params

    try {
        const product = await productsServices.findSingle(id)

        if (product === null) {
            throw notFound('Product Not Found')
        }

        const response = {
            code: 200,
            message: 'Product retrieved successfully',
            data: {
                id: product._id,
                name: product.name,
                price: product.price,
                description: product.description,
                timestamp: {
                    createdAt: product.createdAt,
                    updatedAt: product.updatedAt
                },
                links: {
                    self: `api/v1/products/${product._id}`
                }
            }
        };

        res.status(200).json(response);
    } catch (err) {
        next(err);
    }
};

module.exports = findSingle