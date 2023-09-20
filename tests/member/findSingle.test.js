


const findSingleController = require('../../src/api/v1/members/controllers/findSingle');
const membersServices = require('../../src/lib/members/index');
const { notFound } = require('../../src/utilis/error');

jest.mock('../../src/lib/members/index');

const req = {
    params: {
        id: '64fabcd9dee2326d6e1cd2d4',
    },
};
const res = {
    status: jest.fn(() => res),
    json: jest.fn(),
};
const next = jest.fn();

describe('findSingle Controller', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should return a meal when found', async () => {

        const mockMember = {
            _id: '64fabcd9dee2326d6e1cd2d4',
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: 'password123',
            role: 'Member',
            createdAt: "23-3-200",
            updatedAt: "23-3-200"
        };
        membersServices.findSingle.mockResolvedValue(mockMember);

        await findSingleController(req, res, next);

        expect(membersServices.findSingle).toHaveBeenCalledWith(req.params.id);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            code: 200,
            message: "Member retrieved successfully",
            data: {
                id: mockMember._id,
                name: mockMember.name,
                email: mockMember.email,
                role: 'Member',
                timestamp: {
                    createdAt: mockMember.createdAt,
                    updatedAt: mockMember.updatedAt,
                },
            }
        });
    });

    it('should handle errors and call next', async () => {
        const error = new Error('Meal not found');
        membersServices.findSingle.mockRejectedValueOnce(error);

        await findSingleController(req, res, next);

        expect(membersServices.findSingle).toHaveBeenCalledWith(req.params.id);
        expect(next).toHaveBeenCalledWith(error);
    });
});
