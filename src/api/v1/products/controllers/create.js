

const productsServices = require('../../../../lib/products/index')
const validator = require('../../../../validation/index')
const create = async (req, res, next) => {

    const { name, price, description } = req.body;


    try {

        const { isValid, error } = validator.createProduct(name, price, description)
        if (!isValid) {
            throw BadRequest("Bad Request")

        }
        const product = await productsServices.create({ name, price, description });

        const response = {
            code: 201,
            message: "Add a single product successfull",
            data: {
                id: product._id,
                name: product.name,
                price: product.price,
                description: product.description,
                timestamp: {
                    createdAt: product.createdAt,
                    updatedAt: product.updatedAt,
                },
                links: {
                    self: `api/v1/products/${product._id}`
                }

            }
        };

        res.status(201).json(response);
    } catch (err) {
        next(err);
    }
};

module.exports = create