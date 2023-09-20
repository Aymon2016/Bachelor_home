
require('dotenv').config()

const tokenService = require('../../../../lib/token/index');
const { authenticationError } = require('../../../../utilis/error');
const generateAccessToken = async (req, res, next) => {

    const { refresh_token } = req.body;

    try {

        const isValid = tokenService.verifyToken({ token: refresh_token, secret: process.env.REFRESH_TOKEN_SECRET })


        const decodeTokenObj = tokenService.decodeToken({ token: refresh_token })
        const payload = {
            id: decodeTokenObj.id,
            name: decodeTokenObj.name,
            email: decodeTokenObj.email,
            role: decodeTokenObj.role,
        }
        const newAccessToken = tokenService.generateToken({ payload: payload, secret: process.env.ACCESS_TOKEN_SECRET })
        const newRefreshToken = tokenService.generateToken({ payload: payload, secret: process.env.REFRESH_TOKEN_SECRET })

        const response = {
            code: 200,
            message: "Generated token successfull",
            token_data: {
                access_token: newAccessToken,
                refreshToken: newRefreshToken,
            },
            links: {
                signin: 'api/v1/signin'
            }
        }

        res.status(200).json(response);
    } catch (err) {
        next(err);
    }
};

module.exports = generateAccessToken;