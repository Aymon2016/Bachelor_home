const authService = require('../../../../lib/auth/index');
const { generateToken } = require('../../../../lib/token/index')
const validator = require('../../../../validation/index')

const signin = async (req, res, next) => {
    const { email, password } = req.body;

    try {

        const { isValid, error } = validator.singIn(email, password)

        if (!isValid) {
            throw BadRequest("Bad Request")
        }
        const member = await authService.login({ email, password });


        const payload = {
            id: member.id,
            name: member.name,
            email: member.email,
            role: member.role,
        };
        const accessToken = generateToken({ payload })
        const refreshToken = generateToken({ payload: payload, secret: process.env.REFRESH_TOKEN_SECRET })
        // response
        const response = {
            code: 200,
            message: "signin successfull",
            data: {
                id: member.id,
                name: member.name,
                email: member.email,
                role: member.role,
                token_data: {
                    access_token: accessToken,
                    refresh_token: refreshToken
                },
                links: {
                    self: "api/v1/signin",
                    report: `api/v1/monthly_reports/members/${member.id}`
                }
            }
        };

        res.status(200).json(response);
    } catch (err) {
        next(err);
    }
};

module.exports = signin;