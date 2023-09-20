const find_all = require('../../src/api/v1/meals/controllers/findAll');
const mealsServices = require('../../src/lib/meals/index');
const { notFound } = require('../../src/utilis/error');

jest.mock('../../src/lib/meals/index');
jest.mock('../../src/utilis/error');

describe('find_all function', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should retrieve meals successfully', async () => {
        const req = {
            query: {
                page: 1,
                limit: 10,
                sort_type: 'asc',
                sort_by: 'date',
                search: 'search-query',
            },
        };
        const res = {
            status: jest.fn(() => res),
            json: jest.fn(),
        };
        const next = jest.fn();


        mealsServices.findAll.mockResolvedValue([
            {
                id: '64fabcd9dee2326d6e1cd2d4',
                member_id: '64fabcd9dee2326d6e1cd2d4',
                date: '2023-09-14',
                type: 'breakfast',
                price: 10.0,
                description: 'Delicious breakfast',
                createdAt: "23-3-200",
                updatedAt: "23-3-200,"
            }
        ]);

        await find_all(req, res, next);

        expect(mealsServices.findAll).toHaveBeenCalledWith({
            page: 1,
            limit: 10,
            sortType: 'asc',
            sortBy: 'date',
            search: 'search-query',
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
                search: 'search-query',
            },
        };
        const res = {
            status: jest.fn(() => res),
            json: jest.fn(),
        };
        const next = jest.fn();


        mealsServices.findAll.mockResolvedValue([]);


        notFound.mockReturnValue(new Error('Meals Not Found'));

        await find_all(req, res, next);

        expect(mealsServices.findAll).toHaveBeenCalledWith({
            page: 1,
            limit: 10,
            sortType: 'asc',
            sortBy: 'date',
            search: 'search-query',
        });
        expect(next).toHaveBeenCalledWith(new Error('Meals Not Found'));
    });
});
