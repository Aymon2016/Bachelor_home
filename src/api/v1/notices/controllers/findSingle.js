const noticesServices = require('../../../../lib/notices/index')
const { notFound } = require('../../../../utilis/error')

const findSingle = async (req, res, next) => {

    const { id } = req.params

    try {
        const notice = await noticesServices.findSingle(id)

        if (notice === null) {
            throw notFound('Notice Not Found')
        }

        const response = {
            code: 200,
            message: 'Notice retrieved successfully',
            data: {
                id: notice._id,
                title: notice.title,
                body: notice.body,
                timestamp: {
                    createdAt: notice.createdAt,
                    updateAt: notice.updatedAt
                },
                links: {
                    self: `api/v1/notices/${notice._id}`
                }
            }

        };

        res.status(200).json(response);
    } catch (err) {
        next(err);
    }
};

module.exports = findSingle