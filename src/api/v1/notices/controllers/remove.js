const noticesServices = require('../../../../lib/notices/index')

const remove_notice = async (req, res, next) => {

    const { id } = req.params


    try {
        const notice = await noticesServices.remove(id);
        if (notice) {

            const response = {
                code: 204,
                message: 'Remove notice sucessfull'
            };

            res.status(204).json(response);
        }
    } catch (err) {
        next(err);
    }
};

module.exports = remove_notice