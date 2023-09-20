
const memberServices = require('../../../../lib/members/index')
const { notFound } = require('../../../../utilis/error')

const findSingle = async (req, res, next) => {

    const { id } = req.params
    try {


        const member = await memberServices.findSingle(id)

        if (member === null) {
            throw notFound('Member Not Found')
        }
        const response = {
            code: 200,
            message: "Member retrieved successfully",
            data: {
                id: member._id,
                name: member.name,
                email: member.email,
                role: member.role,
                timestamp: {
                    createdAt: member.createdAt,
                    updatedAt: member.updatedAt,
                }
            }
        }
        res.status(200).json(response);
    } catch (err) {
        next(err);
    }
};

module.exports = findSingle