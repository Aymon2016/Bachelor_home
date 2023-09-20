

const findSingleController = require('../../src/api/v1/meals/controllers/findSingle');
const mealsServices = require('../../src/lib/meals/index');
const { notFound } = require('../../src/utilis/error');

jest.mock('../../src/lib/meals/index');

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
            id: '64fabcd9dee2326d6e1cd2d4',
            member_id: '64fabcd9dee2326d6e1cd2d4',
            date: '2023-09-14',
            type: 'breakfast',
            price: 10.0,
            description: 'Delicious breakfast',
            createdAt: "23-3-200",
            updatedAt: "23-3-200,"
        };
        mealsServices.findSingle.mockResolvedValue(mockMeal);

        await findSingleController(req, res, next);

        expect(mealsServices.findSingle).toHaveBeenCalledWith(req.params.id);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            code: 200,
            message: "Meal retrieved successfully",
            data: {
                id: mockMeal._id,
                member_id: mockMeal.member_id,
                date: mockMeal.date,
                type: mockMeal.type,
                price: mockMeal.price,
                description: mockMeal.description,
                timestamp: {
                    createdAt: mockMeal.createdAt,
                    updatedAt: mockMeal.updatedAt,
                },
            },
            links: {
                self: `api/v1/meals/64fabcd9dee2326d6e1cd2d4`
            },
        });
    });

    it('should handle errors and call next', async () => {
        const error = new Error('Meal not found');
        mealsServices.findSingle.mockRejectedValueOnce(error);

        await findSingleController(req, res, next);

        expect(mealsServices.findSingle).toHaveBeenCalledWith(req.params.id);
        expect(next).toHaveBeenCalledWith(error);
    });
});
