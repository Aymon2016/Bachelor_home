



const removeMember = require('../../src/api/v1/members/controllers/remove');
const membersServices = require('../../src/lib/members/index');
const { notFound, serverError } = require('../../src/utilis/error');

jest.mock('../../src/lib/members/index');

describe('removeMeal Function', () => {
    it('should remove a member with a valid ID', async () => {
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

        membersServices.remove.mockResolvedValueOnce(true);

        await removeMember(req, res, next);

        expect(membersServices.remove).toHaveBeenCalledWith('64fabcd9dee2326d6e1cd2d4');
        expect(res.status).toHaveBeenCalledWith(204);
        expect(res.json).toHaveBeenCalledWith({
            code: 204,
            message: "Member deleted successful",
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
        membersServices.remove.mockRejectedValueOnce(error);

        await removeMember(req, res, next);

        expect(membersServices.remove).toHaveBeenCalledWith('64fabcd9dee2326d6e1cd9d4');
        expect(res.status).not.toHaveBeenCalled();
        expect(res.json).not.toHaveBeenCalled();
        expect(next).toHaveBeenCalledWith(error);
    });
});
