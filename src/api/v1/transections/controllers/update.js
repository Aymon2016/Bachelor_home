

const accountsServices = require('../../../../lib/transections/index')

const update = async (req, res, next) => {
    const { id } = req.params
    const { deposit_amount } = req.body;

    try {

        const deposite = await accountsServices.update(id, deposit_amount)

        const response = {
            code: 201,
            message: 'Update transection successfull',
            data: deposite,
            links: {
                self: `api/v1/transections/${deposite._id}`
            }
        };

        res.status(201).json(response);
    } catch (err) {
        next(err);
    }
};

module.exports = update