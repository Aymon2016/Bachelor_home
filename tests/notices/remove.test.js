

const removeNotice = require('../../src/api/v1/notices/controllers/remove');
const noticesServices = require('../../src/lib/notices/index');
const { notFound, serverError } = require('../../src/utilis/error');

jest.mock('../../src/lib/notices/index');

describe('removeNotice Function', () => {
    it('should removeNotice with a valid ID', async () => {
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

        noticesServices.remove.mockResolvedValueOnce(true);

        await removeNotice(req, res, next);

        expect(noticesServices.remove).toHaveBeenCalledWith('64fabcd9dee2326d6e1cd2d4');
        expect(res.status).toHaveBeenCalledWith(204);
        expect(res.json).toHaveBeenCalledWith({
            code: 204,
            message: 'Remove notice sucessfull'
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
        noticesServices.remove.mockRejectedValueOnce(error);

        await removeNotice(req, res, next);

        expect(noticesServices.remove).toHaveBeenCalledWith('64fabcd9dee2326d6e1cd9d4');
        expect(res.status).not.toHaveBeenCalled();
        expect(res.json).not.toHaveBeenCalled();
        expect(next).toHaveBeenCalledWith(error);
    });
});
