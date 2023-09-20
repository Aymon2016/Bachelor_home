

const accountsServices = require('../../../../lib/transections/index')

const findSingle = async (req, res, next) => {

    const { id } = req.params

    try {

        const deposite = await accountsServices.findSingle(id)

        const response = {
            code: 200,
            message: "Transection Found Successfull",
            member_id: deposite.member_id,
            data: {
                id: deposite._id,
                deposite_ammount: deposite.deposit_amount,
                timestamp: {
                    createdAt: deposite.createdAt,
                    updatedAt: deposite.updatedAt
                },
            },
            links: {
                self: `api/v1/transections/${deposite._id}`
            }

        };

        res.status(200).json(response);
    } catch (err) {
        next(err);
    }
};

module.exports = findSingle