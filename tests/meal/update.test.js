

const updateMeal = require('../../src/api/v1/meals/controllers/update');
const mealsServices = require('../../src/lib/meals/index');
const { notFound } = require('../../src/utilis/error');

jest.mock('../../src/lib/meals/index');

describe('updateMeal Function', () => {
    it('should update a meal with a valid ID', async () => {
        const req = {
            params: {
                id: '64fabcd9dee2326d6e1cd2d4',
            },
            body: {
                member_id: '64fabcd9dee2326d6e1cd1d4',
                date: '2023-09-14',
                type: 'lunch',
                price: 15.0,
                description: 'Updated lunch',
            },
        };

        const updatedMeal = {
            _id: '64fabcd9dee2326d6e1cd2d4',
            member_id: '64fabcd9dee2326d6e1cd1d4',
            date: '2023-09-14',
            type: 'lunch',
            price: 15.0,
            description: 'Updated lunch',
            createdAt: '2023-09-14',
            updatedAt: '2023-09-15',
        };


        mealsServices.updateAndCreate.mockResolvedValue(updatedMeal);

        const res = {
            status: jest.fn(() => res),
            json: jest.fn(),
        };

        const next = jest.fn();

        await updateMeal(req, res, next);


        expect(mealsServices.updateAndCreate).toHaveBeenCalledWith(req.params.id, req.body);
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({
            code: 201,
            message: "Update meals successfull",
            data: {
                id: updatedMeal._id,
                member_id: updatedMeal.member_id,
                date: updatedMeal.date,
                type: updatedMeal.type,
                price: updatedMeal.price,
                description: updatedMeal.description,
                timestamp: {
                    createdAt: updatedMeal.createdAt,
                    updatedAt: updatedMeal.updatedAt,
                },
            },
            links: {
                self: `api/v1/meals/64fabcd9dee2326d6e1cd2d4`
            },
        });
    });
});
