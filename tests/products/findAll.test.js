const find_all = require('../../src/api/v1/products/controllers/findAll');
const productsServices = require('../../src/lib/products/index');
const { notFound } = require('../../src/utilis/error');

jest.mock('../../src/lib/products/index');
jest.mock('../../src/utilis/error');

describe('find_all function', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should retrieve products successfully', async () => {
        const req = {
            query: {
                page: 1,
                limit: 10,
                sort_type: 'asc',
                sort_by: 'date',
                search: 'search',
            },
        };
        const res = {
            status: jest.fn(() => res),
            json: jest.fn(),
        };
        const next = jest.fn();


        productsServices.findAll.mockResolvedValue([
            {
                _id: '64fabcd9dee2326d6e1cd2d4',
                name: "rice",
                price: "2990",
                description: "hello bro",
                createdAt: "2023 -09 - 16",
                updatedAt: "2023 -09 - 12"

            }
        ]);

        await find_all(req, res, next);

        expect(productsServices.findAll).toHaveBeenCalledWith({
            page: 1,
            limit: 10,
            sortType: 'asc',
            sortBy: 'date',
            search: 'search',
        });
        expect(res.status).toHaveBeenCalledWith(200);


    });

    it('should handle not found error', async () => {
        const req = {
            query: {
                page: 1,
                limit: 10,
                sort_type: 'asc',
                sort_by: 'date',
                search: 'search',
            },
        };
        const res = {
            status: jest.fn(() => res),
            json: jest.fn(),
        };
        const next = jest.fn();


        productsServices.findAll.mockResolvedValue([]);


        notFound.mockReturnValue(new Error('Product Not Found'));

        await find_all(req, res, next);

        expect(productsServices.findAll).toHaveBeenCalledWith({
            page: 1,
            limit: 10,
            sortType: 'asc',
            sortBy: 'date',
            search: 'search',
        });
        expect(next).toHaveBeenCalledWith(new Error('Product Not Found'));
    });
});
