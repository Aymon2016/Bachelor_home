


const depositeTransection = require('../../src/api/v1/transections/controllers/create')
const { deposite } = require('../../src/lib/transections/index');


jest.mock('../../src/lib/transections/index');

const req = {
    params: {
        member_id: '64fabcd9dee2326d6e1cd2d4'
    },
    body: {
        deposit_amount: 200
    },
};
const res = {
    status: jest.fn(() => res),
    json: jest.fn(),
};
const next = jest.fn();

describe('deposite create controller', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    })
    afterEach(() => {
        jest.clearAllMocks();
    });

    const mockDeposite = {
        _id: '64fabcd9dee2326d6e1cd2d5',
        member_id: '64fabcd9dee2326d6e1cd2d4',
        deposit_amount: 200,
        createdAt: "2023 -09 - 16",
        updatedAt: "2023 -09 - 12"
    }
    deposite.mockResolvedValue(mockDeposite)

    it('should create and return a response', async () => {
        await depositeTransection(req, res, next);
        const { member_id } = req.params
        const { deposit_amount } = req.body

        expect(deposite).toHaveBeenCalledWith(member_id, deposit_amount)

        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({
            code: 201,
            message: 'Transection Create Successfull',
            member_id: mockDeposite.member_id,
            data: {
                id: mockDeposite._id,
                deposit_amount: mockDeposite.deposit_amount
            },
            links: {
                self: `api/v1/transections/64fabcd9dee2326d6e1cd2d5`
            }
        })
    })

    it('should handle errors and call next', async () => {
        const error = new Error('Test error');
        deposite.mockRejectedValueOnce(error);
        const { member_id } = req.params
        const { deposit_amount } = req.body
        await depositeTransection(req, res, next);

        expect(deposite).toHaveBeenCalledWith(member_id, deposit_amount)

        expect(next).toHaveBeenCalledWith(error);
    })


})