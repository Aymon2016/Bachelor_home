
const { generateToken, verifyToken, decodeToken } = require('../../src/lib/token/index')
const jwt = require('jsonwebtoken');
const { serverError } = require('../../src/utilis/error')
describe('generateToken', () => {
    it('should generate a valid JWT token with default options', () => {

        const payload = { userId: 123 };
        const token = generateToken({ payload, secret: 'hello' });
        const decoded = jwt.verify(token, 'hello');
        expect(decoded.userId).toBe(payload.userId);
    })

    it('should generate a token with custom options', () => {

        const payload = { userId: 456 };
        const customOptions = {
            algorithm: 'HS256',
            secret: 'custom-secret-key',
            expiresIn: '2h',
        };
        const token = generateToken({ payload, ...customOptions });
        const decoded = jwt.verify(token, customOptions.secret);
        expect(decoded.userId).toBe(payload.userId);
    });
})

describe('verifyToken', () => {
    it('should verify a valid JWT token', () => {

        const secret = 'hello token'
        const payload = { userId: 123 };
        const token = jwt.sign(payload, secret);
        const decoded = verifyToken({ token, secret });
        expect(decoded.userId).toBe(payload.userId);
    });

    it('should throw an authentication error for an invalid token', () => {

        const token = 'erfdsfdi';
        const haserror = () => verifyToken({ token });
        expect(haserror).toThrowError('Token is not valid');
    });
});


describe('decodeToken', () => {
    it('should decode a valid JWT token', () => {

        const payload = { userId: 123 };
        const token = jwt.sign(payload, 'your-secret-key');
        const decoded = decodeToken({ token });
        expect(decoded.userId).toBe(payload.userId);
    });

    it('should throw an error for an invalid token', () => {

        const invalidToken = 'ddjfdwekrejifodkji';
        const decodeInvalidToken = () => decodeToken({ token: invalidToken });
        expect(decodeInvalidToken).toThrowError('serverError')
    });
});

