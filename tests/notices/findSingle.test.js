

const findSingleController = require('../../src/api/v1/notices/controllers/findSingle');
const noticesServices = require('../../src/lib/notices/index');
const { notFound } = require('../../src/utilis/error');

jest.mock('../../src/lib/notices/index');

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

        const mockMeal = {
            _id: '64fabcd9dee2326d6e1cd2d4',
            title: 'gas is finish',
            body: 'hello bro gast is finish',
            createdAt: "2023 -09 - 16",
            updatedAt: "2023 -09 - 12"
        };
        noticesServices.findSingle.mockResolvedValue(mockMeal);

        await findSingleController(req, res, next);

        expect(noticesServices.findSingle).toHaveBeenCalledWith(req.params.id);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            code: 200,
            message: 'Notice retrieved successfully',
            data: {
                id: mockMeal._id,
                title: mockMeal.title,
                body: mockMeal.body,
                timestamp: {
                    createdAt: mockMeal.createdAt,
                    updateAt: mockMeal.updatedAt
                },
                links: {
                    self: `api/v1/notices/${mockMeal._id}`
                }
            }
        });
    });

    it('should handle errors and call next', async () => {
        const error = new Error('Notice not found');
        noticesServices.findSingle.mockRejectedValueOnce(error);

        await findSingleController(req, res, next);

        expect(noticesServices.findSingle).toHaveBeenCalledWith(req.params.id);
        expect(next).toHaveBeenCalledWith(error);
    });
});
