

const signin = require('../../src/api/v1/auth/controllers/signin')
const { login } = require('../../src/lib/auth/index');
const { generateToken } = require('../../src/lib/token/index');

jest.mock('../../src/lib/auth/index');

jest.mock('../../src/lib/token/index', () => ({
    generateToken: jest.fn(() => 'mocked-token'),
}));

const req = {
    body: {
        email: 'test@example.com',
        password: 'password',
    },
};
const res = {
    status: jest.fn(() => res),
    json: jest.fn(),
};
const next = jest.fn();

describe('signIn controller', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    })
    afterEach(() => {
        jest.clearAllMocks();
    });

    login.mockResolvedValue({

        id: '123',
        name: 'Test User',
        email: 'test@example.com',
        role: 'Admin',

    })
    it('should login and return a response', async () => {
        await signin(req, res, next);

        expect(login).toHaveBeenCalledWith({
            email: 'test@example.com',
            password: 'password'
        })
        const payload = {
            id: '123',
            name: 'Test User',
            email: 'test@example.com',
            role: 'Admin',
        }
        expect(generateToken).toHaveBeenCalledWith({ payload })
        expect(res.status).toHaveBeenCalledWith(200);


        expect(res.json).toHaveBeenCalledWith({
            code: 200,
            message: "signin successfull",
            data: {
                id: '123',
                name: 'Test User',
                email: 'test@example.com',
                role: 'Admin',
                token_data: {
                    access_token: 'mocked-token',
                    refresh_token: 'mocked-token',
                },
                links: {
                    self: 'api/v1/signin',
                    report: `api/v1/monthly_reports/members/${payload.id}`
                }
            }
        })
    })

    it('should handle errors and call next', async () => {
        const error = new Error('Test error');
        login.mockRejectedValueOnce(error);

        await signin(req, res, next);

        expect(login).toHaveBeenCalledWith({
            email: 'test@example.com',
            password: 'password',
        })

        expect(next).toHaveBeenCalledWith(error);
    })


})
