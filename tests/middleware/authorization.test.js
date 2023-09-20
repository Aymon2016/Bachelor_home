

// authorize.test.js
const { authorizationError } = require('../../src/utilis/error');
const authorize = require('../../src/middleware/auth/authorize');

// Mock the dependencies
const req = { member: { role: 'Admin' } };
const res = {};
const next = jest.fn();

describe('authorize middleware', () => {
    beforeEach(() => {
        next.mockClear();
    });

    it('should call next() when the member has the "Admin" role', () => {
        authorize(req, res, next);
        expect(next).toHaveBeenCalled();
    });

    it('should call next(authorizationError()) when the member does not have the "Admin" role', () => {
        req.member.role = 'Member';
        authorize(req, res, next);
        expect(next).toHaveBeenCalledWith(authorizationError());
    });
});
