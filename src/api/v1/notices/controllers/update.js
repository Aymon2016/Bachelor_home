const noticesServices = require('../../../../lib/notices/index')

const update_notice = async (req, res, next) => {
    const { title, body } = req.body;
    const { id } = req.params


    try {
        const updateData = {
            title, body
        }
        const notice = await noticesServices.update(id, updateData);

        const response = {
            code: 201,
            message: "Update notice successfull",
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

        res.status(201).json(response);
    } catch (err) {
        next(err);
    }
};

module.exports = update_notice