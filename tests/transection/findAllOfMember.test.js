
const findAllOfMemberController = require('../../src/api/v1/transections/controllers/findAllOfMember');
const transectionsServices = require('../../src/lib/transections/index');
const { notFound } = require('../../src/utilis/error');

jest.mock('../../src/lib/transections/index');
jest.mock('../../src/utilis/error');

describe('find_allOfMember function', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should retrieve transections successfully', async () => {
        const req = {
            params: {
                member_id: '64fabcd9dee2326d6e1cd2d4',
            },
            query: {
                page: 1,
                limit: 10,
                sort_type: 'asc',
                sort_by: 'updatedAt',

            },
        };
        const res = {
            status: jest.fn(() => res),
            json: jest.fn(),
        };
        const next = jest.fn();


        transectionsServices.findAllOfMember.mockResolvedValue([
            {
                id: '64fabcd9dee2326d6e1cd2d4',
                member_id: '64fabcd9dee2326d6e1cd2d4',
                deposit_amount: 200,
                createdAt: "23-3-200",
                updatedAt: "23-3-200,"
            }
        ]);

        await findAllOfMemberController(req, res, next);
        const { member_id } = req.params
        expect(transectionsServices.findAllOfMember).toHaveBeenCalledWith(member_id, {
            page: 1,
            limit: 10,
            sortType: 'asc',
            sortBy: 'updatedAt',
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
                sort_by: 'updatedAt',

            },
        };
        const res = {
            status: jest.fn(() => res),
            json: jest.fn(),
        };
        const next = jest.fn();


        transectionsServices.findAllOfMember.mockResolvedValue([]);


        notFound.mockReturnValue(new Error('transections Not Found'));

        await findAllOfMemberController(req, res, next);
        const { member_id } = req.params
        expect(transectionsServices.findAllOfMember).toHaveBeenCalledWith(member_id, {
            page: 1,
            limit: 10,
            sortType: 'asc',
            sortBy: 'updatedAt',

        });
        expect(next).toHaveBeenCalledWith(new Error('transections Not Found'));
    });
});
