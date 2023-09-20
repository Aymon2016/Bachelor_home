

const updateDeposite = require('../../src/api/v1/transections/controllers/update');
const transectionsServices = require('../../src/lib/transections/index');
const { notFound } = require('../../src/utilis/error');

jest.mock('../../src/lib/transections/index');

describe('update product Function', () => {
    it('should update a product with a valid ID', async () => {
        const req = {
            params: {
                id: '64fabcd9dee2326d6e1cd2d4',
            },
            body: {
                deposit_amount: 300
            },
        };

        const updatedDeposite = {
            _id: '64fabcd9dee2326d6e1cd2d4',
            member_id: '64fabcd9dee2326d6e1cd2d4',
            deposit_amount: 300,
            createdAt: "23-3-200",
            updatedAt: "23-3-200,"
        };


        transectionsServices.update.mockResolvedValue(updatedDeposite);

        const res = {
            status: jest.fn(() => res),
            json: jest.fn(),
        };

        const next = jest.fn();

        await updateDeposite(req, res, next);

        const id = req.params.id
        const deposit_amount = req.body.deposit_amount

        expect(transectionsServices.update).toHaveBeenCalledWith(id, deposit_amount);
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({
            code: 201,
            message: 'Update transection successfull',
            data: updatedDeposite,
            links: {
                self: 'api/v1/transections/64fabcd9dee2326d6e1cd2d4'
            }
        });
    });
});
