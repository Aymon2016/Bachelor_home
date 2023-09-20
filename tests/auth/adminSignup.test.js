

const signup = require('../../src/api/v1/adminAuth/controllers/signup')

const { register } = require('../../src/lib/adminAuth/index');
const { generateToken } = require('../../src/lib/token/index');


// Mock the dependencies
jest.mock('../../src/lib/adminAuth/index', () => ({
    register: jest.fn(() => ({
        id: '123',
        name: 'Test User',
        email: 'test@example.com',
        role: 'Admin',
    })),
}));

jest.mock('../../src/lib/token/index', () => ({
    generateToken: jest.fn(() => 'mocked-token'),
}));

const req = {
    body: {
        name: 'Test User',
        email: 'test@example.com',
        password: 'password',
    },
};
const res = {
    status: jest.fn(() => res),
    json: jest.fn(),
};
const next = jest.fn();

describe('signup controller', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should create a new member and return a response', async () => {
        await signup(req, res, next);

        expect(register).toHaveBeenCalledWith({
            name: 'Test User',
            email: 'test@example.com',
            password: 'password',
        })
        const payload = {
            id: '123',
            name: 'Test User',
            email: 'test@example.com',
            role: 'Admin',
        }
        expect(generateToken).toHaveBeenCalledWith({ payload })
        expect(res.status).toHaveBeenCalledWith(201);


        expect(res.json).toHaveBeenCalledWith({
            code: 201,
            message: "signup successfull",
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
                    self: 'api/v1/auth/signup',
                    signin: 'api/v1/auth/signin'
                }
            }
        })
    })

    it('should handle errors and call next', async () => {
        const error = new Error('Test error');
        register.mockRejectedValueOnce(error);

        await signup(req, res, next);

        expect(register).toHaveBeenCalledWith({
            name: 'Test User',
            email: 'test@example.com',
            password: 'password',
        })

        expect(next).toHaveBeenCalledWith(error);
    })
})

const { anyMemberExist, memberExist, createMember } = require('../../src/lib/members/index')
const { resourceConflict, badRequest } = require('../../src/utilis/error')
const { generateHash } = require('../../src/utilis/hashing');


// Mock the dependencies
jest.mock('../../src/lib/members/index', () => ({
    anyMemberExist: jest.fn(),
    memberExist: jest.fn(),
    createMember: jest.fn(),
}));

jest.mock('../../src/utilis/error', () => ({
    resourceConflict: jest.fn(),
    badRequest: jest.fn(),
}));

jest.mock('../../src/utilis/hashing', () => ({
    generateHash: jest.fn(),
}));

describe('register function', () => {

    it('should successfully register a new member', async () => {
        anyMemberExist.mockResolvedValue(false);
        memberExist.mockResolvedValue(false);
        generateHash.mockResolvedValue('hashed-password');
        const createdMember = {
            id: '123',
            name: 'Test User',
            email: 'test@example.com',
            role: 'Admin',
        };
        createMember.mockResolvedValue(createdMember);


        const userData = {
            name: 'Test User',
            email: 'test@example.com',
            password: 'password',
        };
        const result = await register(userData);
        expect(result).toEqual(createdMember);
    })
});


