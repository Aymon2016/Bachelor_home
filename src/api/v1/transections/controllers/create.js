
const accountsServices = require('../../../../lib/transections/index')

const deposite = async (req, res, next) => {
    const { member_id } = req.params
    const { deposit_amount } = req.body;

    try {

        const deposite = await accountsServices.deposite(member_id, deposit_amount)

        const response = {
            code: 201,
            message: 'Transection Create Successfull',
            member_id: member_id,
            data: {
                id: deposite._id,
                deposit_amount: deposite.deposit_amount
            },
            links: {
                self: `api/v1/transections/${deposite._id}`
            }
        };

        res.status(201).json(response);
    } catch (err) {
        next(err);
    }
};

module.exports = deposite