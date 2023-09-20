

const updateProduct = require('../../src/api/v1/products/controllers/update');
const productsServices = require('../../src/lib/products/index');
const { notFound } = require('../../src/utilis/error');

jest.mock('../../src/lib/products/index');

describe('update product Function', () => {
    it('should update a product with a valid ID', async () => {
        const req = {
            params: {
                id: '64fabcd9dee2326d6e1cd2d4',
            },
            body: {
                name: "rice",
                price: "2990",
                description: "hello bro"
            },
        };

        const updatedProduct = {
            _id: '64fabcd9dee2326d6e1cd2d4',
            name: "rice",
            price: "2990",
            description: "hello bro",
            createdAt: "23-3-200",
            updatedAt: "23-3-200"
        };


        productsServices.update.mockResolvedValue(updatedProduct);

        const res = {
            status: jest.fn(() => res),
            json: jest.fn(),
        };

        const next = jest.fn();

        await updateProduct(req, res, next);


        expect(productsServices.update).toHaveBeenCalledWith(req.params.id, req.body);
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({
            code: 201,
            message: 'update products sucessfull',
            product: updatedProduct,
        });
    });
});
