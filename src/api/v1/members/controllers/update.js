const memberServices = require('../../../../lib/members/index')

const updateMember = async (req, res, next) => {

    const { id } = req.params;
    const name = req.body.name;
    const email = req.body.email;
    const updateData = { name, email }
    try {

        const updateMember = await memberServices.update(id, updateData)

        const response = {
            code: 200,
            message: "Member updated successfully",
            data:
            {
                id: updateMember._id,
                name: updateMember.name,
                email: updateMember.email,
                role: updateMember.role,
                timestamp: {
                    createdAt: updateMember.createdAt,
                    updatedAt: updateMember.updatedAt
                }
            }
        }
        res.status(200).json(response);
    } catch (err) {
        next(err);
    }
};

module.exports = updateMember