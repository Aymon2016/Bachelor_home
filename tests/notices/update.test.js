

const updateNotices = require('../../src/api/v1/notices/controllers/update');
const noticesServices = require('../../src/lib/notices/index');
const { notFound } = require('../../src/utilis/error');

jest.mock('../../src/lib/notices/index');

describe('updateNotice Function', () => {
    it('should updateNotice with a valid ID', async () => {
        const req = {
            params: {
                id: '64fabcd9dee2326d6e1cd2d4',
            },
            body: {
                title: 'gas is finished',
                body: "gas kine an"
            },
        };

        const updateNotice = {
            _id: '64fabcd9dee2326d6e1cd2d4',
            title: 'gas is finished',
            body: "gas kine an",
            createdAt: '2023-09-14',
            updatedAt: '2023-09-15',
        };


        noticesServices.update.mockResolvedValue(updateNotice);

        const res = {
            status: jest.fn(() => res),
            json: jest.fn(),
        };

        const next = jest.fn();

        await updateNotices(req, res, next);


        expect(noticesServices.update).toHaveBeenCalledWith(req.params.id, req.body);
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({
            code: 201,
            message: "Update notice successfull",
            data: {
                id: updateNotice._id,
                title: updateNotice.title,
                body: updateNotice.body,
                timestamp: {
                    createdAt: updateNotice.createdAt,
                    updateAt: updateNotice.updatedAt
                },
                links: {
                    self: `api/v1/notices/${updateNotice._id}`
                }
            }
        });
    });
});
