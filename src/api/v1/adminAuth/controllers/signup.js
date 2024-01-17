
const validator = require('../../../../validation/index')
const adminAuthService = require('../../../../lib/adminAuth/index');
const { generateToken } = require('../../../../lib/token/index');
const { BadRequest } = require('express-openapi-validator/dist/openapi.validator');

const signup = async (req, res, next) => {
    const { name, email, password } = req.body;

    try {

        // const { isValid, error } = validator.singup(name, email, password)
        // if (!isValid) {
        //     throw BadRequest("Bad Request")

        // }

        const member = await adminAuthService.register({ name, email, password });


        // generate access and refresh token
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
            code: 201,
            message: "signup successfull",
            data: {
                id: member.id,
                name: member.name,
                email: member.email,
                role: member.role,
                token_data: {
                    access_token: accessToken,
                    refresh_token: refreshToken,
                },
                links: {
                    self: "api/v1/auth/signup",
                    signin: "api/v1/auth/signin"
                }
            }
        };

        res.status(201).json(response);
    } catch (err) {
        next(err);
    }
};

module.exports = signup;