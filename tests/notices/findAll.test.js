const find_all = require('../../src/api/v1/notices/controllers/findAll');
const noticesServices = require('../../src/lib/notices/index');
const { notFound } = require('../../src/utilis/error');

jest.mock('../../src/lib/notices/index');
jest.mock('../../src/utilis/error');

describe('find_all function', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should retrieve notices successfully', async () => {
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


        noticesServices.findAll.mockResolvedValue([
            {
                _id: '64fabcd9dee2326d6e1cd2d4',
                title: 'gas is finish',
                body: 'hello bro gast is finish',
                createdAt: "2023 -09 - 16",
                updatedAt: "2023 -09 - 12"
            }
        ]);

        await find_all(req, res, next);

        expect(noticesServices.findAll).toHaveBeenCalledWith({
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


        noticesServices.findAll.mockResolvedValue([]);


        notFound.mockReturnValue(new Error('notices Not Found'));

        await find_all(req, res, next);

        expect(noticesServices.findAll).toHaveBeenCalledWith({
            page: 1,
            limit: 10,
            sortType: 'asc',
            sortBy: 'date',
            search: 'search-query',
        });
        expect(next).toHaveBeenCalledWith(new Error('notices Not Found'));
    });
});
