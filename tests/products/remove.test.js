



const removeProduct = require('../../src/api/v1/products/controllers/remove');
const productsServices = require('../../src/lib/products/index');
const { notFound, serverError } = require('../../src/utilis/error');

jest.mock('../../src/lib/products/index');

describe('remove products Function', () => {
    it('should remove a product with a valid ID', async () => {
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

        productsServices.remove.mockResolvedValueOnce(true);

        await removeProduct(req, res, next);

        expect(productsServices.remove).toHaveBeenCalledWith('64fabcd9dee2326d6e1cd2d4');
        expect(res.status).toHaveBeenCalledWith(204);
        expect(res.json).toHaveBeenCalledWith({
            code: 204,
            message: 'Remove product sucessfull',
        });
        expect(next).not.toHaveBeenCalled();
    });

    it('should handle errors and call next', async () => {
        const req = {
            params: {
                id: '64fabcd9dee2326d6e1cd9d4',
            },
        };
        const res = {
            status: jest.fn(() => res),
            json: jest.fn(),
        };
        const next = jest.fn();


        const error = new Error('Test error');
        productsServices.remove.mockRejectedValueOnce(error);

        await removeProduct(req, res, next);

        expect(productsServices.remove).toHaveBeenCalledWith('64fabcd9dee2326d6e1cd9d4');
        expect(res.status).not.toHaveBeenCalled();
        expect(res.json).not.toHaveBeenCalled();
        expect(next).toHaveBeenCalledWith(error);
    });
});
