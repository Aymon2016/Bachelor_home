

const signout = async (req, res, next) => {
    try {

        // Perform any server-side cleanup or token invalidation as needed.

        const response = {

            code: 200,
            message: "singout successfull"
        }
        res.status(200).json(response);

    } catch (err) {
        next(err);
    }
};

module.exports = signout