
const find_allOfMember = require('../../src/api/v1/meals/controllers/findAllOfMember');
const mealsServices = require('../../src/lib/meals/index');
const { notFound } = require('../../src/utilis/error');

jest.mock('../../src/lib/meals/index');
jest.mock('../../src/utilis/error');

describe('find_allOfMember function', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should retrieve meals successfully', async () => {
        const req = {
            params: {
                member_id: '64fabcd9dee2326d6e1cd2d4',
            },
            query: {
                page: 1,
                limit: 10,
                sort_type: 'asc',
                sort_by: 'date',

            },
        };
        const res = {
            status: jest.fn(() => res),
            json: jest.fn(),
        };
        const next = jest.fn();


        mealsServices.findAllOfMember.mockResolvedValue([
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

        await find_allOfMember(req, res, next);
        const { member_id } = req.params
        expect(mealsServices.findAllOfMember).toHaveBeenCalledWith(member_id, {
            page: 1,
            limit: 10,
            sortType: 'asc',
            sortBy: 'date',
        });
        expect(res.status).toHaveBeenCalledWith(200);


    });

    it('should handle not found error', async () => {
        const req = {
            params: {
                member_id: '64fabcd9dee2326d6e1cd2d4',
            },
            query: {
                page: 1,
                limit: 10,
                sort_type: 'asc',
                sort_by: 'date',

            },
        };
        const res = {
            status: jest.fn(() => res),
            json: jest.fn(),
        };
        const next = jest.fn();


        mealsServices.findAllOfMember.mockResolvedValue([]);


        notFound.mockReturnValue(new Error('Meals Not Found'));

        await find_allOfMember(req, res, next);
        const { member_id } = req.params
        expect(mealsServices.findAllOfMember).toHaveBeenCalledWith(member_id, {
            page: 1,
            limit: 10,
            sortType: 'asc',
            sortBy: 'date',

        });
        expect(next).toHaveBeenCalledWith(new Error('Meals Not Found'));
    });
});
