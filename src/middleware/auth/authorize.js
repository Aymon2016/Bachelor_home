const { authorizationError } = require('../../utilis/error');

const authorize = (req, _res, next) => {
    const member = req.member;
    if (member.role === 'Admin') {
        return next();
    }
    return next(authorizationError());

};

module.exports = authorize;