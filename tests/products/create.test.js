


const createProduct = require('../../src/api/v1/products/controllers/create')
const { create } = require('../../src/lib/products/index');


jest.mock('../../src/lib/products/index');

const req = {
    body: {
        name: "rice",
        price: "2990",
        description: "hello bro"
    },
};
const res = {
    status: jest.fn(() => res),
    json: jest.fn(),
};
const next = jest.fn();

describe('Create products controller', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    })
    afterEach(() => {
        jest.clearAllMocks();
    });

    const mockProduct = {
        _id: '64fabcd9dee2326d6e1cd2d4',
        name: "rice",
        price: "2990",
        description: "hello bro",
        createdAt: "2023 -09 - 16",
        updatedAt: "2023 -09 - 12"
    }
    create.mockResolvedValue(mockProduct)

    it('should create and return a response', async () => {
        await createProduct(req, res, next);

        expect(create).toHaveBeenCalledWith({
            name: "rice",
            price: "2990",
            description: "hello bro",
        })
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({
            code: 201,
            message: "Add a single product successfull",
            data: {
                id: mockProduct._id,
                name: mockProduct.name,
                price: mockProduct.price,
                description: mockProduct.description,
                timestamp: {
                    createdAt: mockProduct.createdAt,
                    updatedAt: mockProduct.updatedAt,
                },
                links: {
                    self: `api/v1/products/64fabcd9dee2326d6e1cd2d4`
                }

            }
        })
    })

    it('should handle errors and call next', async () => {
        const error = new Error('Test error');
        create.mockRejectedValueOnce(error);

        await createProduct(req, res, next);

        expect(create).toHaveBeenCalledWith({
            name: "rice",
            price: "2990",
            description: "hello bro",
        })

        expect(next).toHaveBeenCalledWith(error);
    })


})