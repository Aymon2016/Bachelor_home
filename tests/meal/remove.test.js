

const removeMeal = require('../../src/api/v1/meals/controllers/remove');
const mealsServices = require('../../src/lib/meals/index');
const { notFound, serverError } = require('../../src/utilis/error');

jest.mock('../../src/lib/meals/index');

describe('removeMeal Function', () => {
    it('should remove a meal with a valid ID', async () => {
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

        mealsServices.remove.mockResolvedValueOnce(true);

        await removeMeal(req, res, next);

        expect(mealsServices.remove).toHaveBeenCalledWith('64fabcd9dee2326d6e1cd2d4');
        expect(res.status).toHaveBeenCalledWith(204);
        expect(res.json).toHaveBeenCalledWith({
            code: 204,
            message: "Meal deleted successful",
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
        mealsServices.remove.mockRejectedValueOnce(error);

        await removeMeal(req, res, next);

        expect(mealsServices.remove).toHaveBeenCalledWith('64fabcd9dee2326d6e1cd9d4');
        expect(res.status).not.toHaveBeenCalled();
        expect(res.json).not.toHaveBeenCalled();
        expect(next).toHaveBeenCalledWith(error);
    });
});
