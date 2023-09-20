

// authenticate.test.js
const authenticate = require('../../src/middleware/auth/authenticate');
const { authenticationError } = require('../../src/utilis/error');


const req = { headers: { authorization: 'Bearer valid-token' } };
const res = {};
const next = jest.fn();




jest.mock('../../src/lib/token/index', () => ({
    verifyToken: jest.fn(() => ({ email: 'test@example.com' })),
}));

jest.mock('../../src/lib/members/index', () => ({
    findMemberByEmail: jest.fn(() => ({ id: '123', email: 'test@example.com' })),
}));



describe('authenticate middleware', () => {
    beforeEach(() => {
        next.mockClear();
    });

    // barrer token diye dile call hobe
    it('should call next() when provided with a valid token', async () => {
        await authenticate(req, res, next);
        expect(next).toHaveBeenCalled();
    });

    // barrer diyena dile authetication error dibe
    it('should call next(authenticationError()) when provided with an invalid token', async () => {
        req.headers.authorization = 'InvalidToken';
        await authenticate(req, res, next);
        expect(next).toHaveBeenCalledWith(authenticationError());
    });

    it('should call next(authenticationError()) when member not found', async () => {
        const findMemberByEmailMock = require('../../src/lib/members/index').findMemberByEmail;
        findMemberByEmailMock.mockResolvedValueOnce(null);

        await authenticate(req, res, next);
        expect(next).toHaveBeenCalledWith(authenticationError());
    });

    it('should call next(authenticationError()) when an error occurs', async () => {
        const tokenServiceMock = require('../../src/lib/token/index').verifyToken;
        tokenServiceMock.mockImplementationOnce(() => {
            throw new Error('Test error');
        });

        await authenticate(req, res, next);
        expect(next).toHaveBeenCalledWith(authenticationError());
    });
});
