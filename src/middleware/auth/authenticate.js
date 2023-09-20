const { authenticationError } = require('../../utilis/error');
const tokenService = require('../../lib/token/index');
const memberService = require('../../lib/members/index')

const authenticate = async (req, _res, next) => {
    const token = req.headers.authorization

    if (!token || !token.startsWith('Bearer ')) return next(authenticationError());

    try {
        const token = req.headers.authorization.split(' ')[1];

        const decoded = tokenService.verifyToken({ token });
        const member = await memberService.findMemberByEmail(decoded.email);

        if (!member) {
            next(authenticationError());
        }

        req.member = { ...member, id: member.id };
        next();
    } catch (e) {
        next(authenticationError());
    }
};

module.exports = authenticate;