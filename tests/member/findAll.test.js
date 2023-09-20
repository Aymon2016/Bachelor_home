const find_all = require('../../src/api/v1/members/controllers/findAll');
const membersServices = require('../../src/lib/members/index');
const { notFound } = require('../../src/utilis/error');

jest.mock('../../src/lib/members/index');
jest.mock('../../src/utilis/error');

describe('find_all function', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should retrieve members successfully', async () => {
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


        membersServices.findAll.mockResolvedValue([
            {
                _id: '64fabcd9dee2326d6e1cd2d4',
                name: 'John Doe',
                email: 'johndoe@example.com',
                password: 'password123',
                role: 'Member',
                createdAt: "23-3-200",
                updatedAt: "23-3-200"

            }
        ]);

        await find_all(req, res, next);

        expect(membersServices.findAll).toHaveBeenCalledWith({
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


        membersServices.findAll.mockResolvedValue([]);


        notFound.mockReturnValue(new Error('Member Not Exist'));

        await find_all(req, res, next);

        expect(membersServices.findAll).toHaveBeenCalledWith({
            page: 1,
            limit: 10,
            sortType: 'asc',
            sortBy: 'date',
            search: 'search',
        });
        expect(next).toHaveBeenCalledWith(new Error('Member Not Exist'));
    });
});
