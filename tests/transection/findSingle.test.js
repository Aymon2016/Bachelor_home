


const findSingleController = require('../../src/api/v1/transections/controllers/findSingle');
const transectionsServices = require('../../src/lib/transections/index');
const { notFound } = require('../../src/utilis/error');

jest.mock('../../src/lib/transections/index');

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

    it('should return a transections when found', async () => {

        const mockTransection = {
            _id: '64fabcd9dee2326d6e1cd2d4',
            member_id: '64fabcd9dee2326d6e1cd2d4',
            deposit_amount: 200,
            createdAt: "23-3-200",
            updatedAt: "23-3-200,"
        };
        transectionsServices.findSingle.mockResolvedValue(mockTransection);

        await findSingleController(req, res, next);

        expect(transectionsServices.findSingle).toHaveBeenCalledWith(req.params.id);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            code: 200,
            message: "Transection Found Successfull",
            member_id: mockTransection.member_id,
            data: {
                id: mockTransection._id,
                deposite_ammount: mockTransection.deposit_amount,
                timestamp: {
                    createdAt: mockTransection.createdAt,
                    updatedAt: mockTransection.updatedAt
                },
            },
            links: {
                self: 'api/v1/transections/64fabcd9dee2326d6e1cd2d4'
            }
        });
    });

    it('should handle errors and call next', async () => {
        const error = new Error('transections not found');
        transectionsServices.findSingle.mockRejectedValueOnce(error);

        await findSingleController(req, res, next);

        expect(transectionsServices.findSingle).toHaveBeenCalledWith(req.params.id);
        expect(next).toHaveBeenCalledWith(error);
    });
});
