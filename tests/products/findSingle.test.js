


const findSingleController = require('../../src/api/v1/products/controllers/findSingle');
const productsServices = require('../../src/lib/products/index');
const { notFound } = require('../../src/utilis/error');

jest.mock('../../src/lib/products/index');

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

    it('should return a products when found', async () => {

        const mockMember = {
            _id: '64fabcd9dee2326d6e1cd2d4',
            name: "rice",
            price: "2990",
            description: "hello bro",
            createdAt: "2023 -09 - 16",
            updatedAt: "2023 -09 - 12"
        };
        productsServices.findSingle.mockResolvedValue(mockMember);

        await findSingleController(req, res, next);

        expect(productsServices.findSingle).toHaveBeenCalledWith(req.params.id);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            code: 200,
            message: 'Product retrieved successfully',
            data: {
                id: mockMember._id,
                name: mockMember.name,
                price: mockMember.price,
                description: mockMember.description,
                timestamp: {
                    createdAt: mockMember.createdAt,
                    updatedAt: mockMember.updatedAt
                },
                links: {
                    self: `api/v1/products/64fabcd9dee2326d6e1cd2d4`
                }
            }
        });
    });

    it('should handle errors and call next', async () => {
        const error = new Error('products not found');
        productsServices.findSingle.mockRejectedValueOnce(error);

        await findSingleController(req, res, next);

        expect(productsServices.findSingle).toHaveBeenCalledWith(req.params.id);
        expect(next).toHaveBeenCalledWith(error);
    });
});
