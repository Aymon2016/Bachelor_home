const memberServices = require('../../../../lib/members/index')
const { notFound } = require('../../../../utilis/error')

const removeMember = async (req, res, next) => {

    const { id } = req.params;
    try {

        await memberServices.remove(id)

        const response = {
            code: 204,
            message: "Member deleted successful"
        }

        res.status(204).json(response);
    } catch (err) {
        next(err);
    }
};

module.exports = removeMember