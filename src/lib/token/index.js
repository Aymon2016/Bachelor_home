require('dotenv').config()

const { serverError, authenticationError } = require('../../utilis/error')
const jwt = require('jsonwebtoken');

const generateToken = ({
    payload,
    algorithm = 'HS256',
    secret = process.env.ACCESS_TOKEN_SECRET,
    expiresIn = '1h',
}) => {
    try {
        return jwt.sign(payload, secret, {
            algorithm,
            expiresIn,
        });
    } catch (e) {
        console.log('[JWT]', e);
        throw serverError();
    }
};

const decodeToken = ({ token, algorithm = 'HS256' }) => {
    try {
        const decoded = jwt.decode(token, { algorithms: [algorithm] });
        if (!decoded) {
            throw serverError("Token cannot be decoded");
        }
        return decoded;
    } catch (e) {
        throw serverError("serverError");
    }
};

const verifyToken = ({
    token,
    algorithm = 'HS256',
    secret = process.env.ACCESS_TOKEN_SECRET,
}) => {
    try {
        return jwt.verify(token, secret, { algorithms: [algorithm] });
    } catch (e) {

        throw authenticationError("Token is not valid");
    }
};

module.exports = {
    generateToken,
    decodeToken,
    verifyToken,
};