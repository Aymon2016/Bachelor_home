
const memberServices = require('../../../../lib/members/index');
const { serverError } = require('../../../../utilis/error');

const changePassword = async (req, res, next) => {
    const { member_id } = req.params
    const { email, currentPassword, newPassword } = req.body;
    try {

        const changePassword = await memberServices.changePassword(member_id, email, currentPassword, newPassword)

        if (!changePassword) {
            throw serverError('Server Error')
        }
        res.status(200).json('password change sucessfull');
    } catch (err) {
        next(err);
    }
};

module.exports = changePassword