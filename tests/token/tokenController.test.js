
const generateAccessToken = require('../../src/api/v1/token/controllers/tokenGenerate');
const tokenService = require('../../src/lib/token/index');
const { authenticationError } = require('../../src/utilis/error');

jest.mock('../../src/lib/token/index');

const req = {
    body: {
        refresh_token: 'your-refresh-token',
    },
};

const res = {
    status: jest.fn(() => res),
    json: jest.fn(),
};

const next = jest.fn();

describe('generateAccessToken controller', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should generate a new access token and return it', async () => {

        tokenService.verifyToken.mockReturnValue(true);
        const mockDecodedToken = {
            id: '123',
            name: 'John Doe',
            email: 'john@example.com',
            role: 'User',
        };
        tokenService.decodeToken.mockReturnValue(mockDecodedToken);

        tokenService.generateToken.mockReturnValueOnce('new-access-token');
        tokenService.generateToken.mockReturnValueOnce('new-refresh-token');

        await generateAccessToken(req, res, next);

        expect(tokenService.verifyToken).toHaveBeenCalledWith({
            token: 'your-refresh-token',
            secret: process.env.REFRESH_TOKEN_SECRET,
        });

        expect(tokenService.decodeToken).toHaveBeenCalledWith({
            token: 'your-refresh-token',
        });

        expect(tokenService.generateToken).toHaveBeenCalledWith({
            payload: mockDecodedToken,
            secret: process.env.ACCESS_TOKEN_SECRET,
        });

        expect(tokenService.generateToken).toHaveBeenCalledWith({
            payload: mockDecodedToken,
            secret: process.env.REFRESH_TOKEN_SECRET,
        });
        const respnse = {
            code: 200,
            message: "Generated token successfull",
            token_data: {
                access_token: 'new-access-token',
                refreshToken: 'new-refresh-token',
            },
            links: {
                signin: 'api/v1/signin'
            }
        }
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(respnse);
    });

    it('should handle errors and call next', async () => {

        tokenService.verifyToken.mockImplementation(() => {
            throw new Error('Token verification failed');
        });

        await generateAccessToken(req, res, next);

        expect(next).toHaveBeenCalledWith(expect.any(Error));
    });
});
