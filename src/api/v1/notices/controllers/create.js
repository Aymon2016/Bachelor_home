

const noticesServices = require('../../../../lib/notices/index')
const validator = require('../../../../validation/index')

const create = async (req, res, next) => {
    const { title, body } = req.body;


    try {

        // const { isValid, error } = validator.createNotice(title, body)
        // if (!isValid) {
        //     throw BadRequest("Bad Request")
        // }

        const notice = await noticesServices.create({ title, body });

        const response = {
            code: 201,
            message: " Notice announched successfull ",
            data: {
                id: notice._id,
                title: notice.title,
                body: notice.body,
                timestamp: {
                    createdAt: notice.createdAt,
                    updatedAt: notice.updatedAt
                }
            },
            links: {
                self: `api/v1/notices/${notice._id}`
            }

        };

        res.status(201).json(response);
    } catch (err) {
        next(err);
    }
};

module.exports = create