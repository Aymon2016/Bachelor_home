

const updateMember = require('../../src/api/v1/members/controllers/update');
const membersServices = require('../../src/lib/members/index');
const { notFound } = require('../../src/utilis/error');

jest.mock('../../src/lib/members/index');

describe('updateMember Function', () => {
    it('should update a member with a valid ID', async () => {
        const req = {
            params: {
                id: '64fabcd9dee2326d6e1cd2d4',
            },
            body: {
                name: 'John Doe',
                email: 'johndoe@example.com',
            },
        };

        const updatedMember = {
            _id: '64fabcd9dee2326d6e1cd2d4',
            name: 'John Doe',
            email: 'johndoe@example.com',
            role: 'Member',
            createdAt: "23-3-200",
            updatedAt: "23-3-200"
        };


        membersServices.update.mockResolvedValue(updatedMember);

        const res = {
            status: jest.fn(() => res),
            json: jest.fn(),
        };

        const next = jest.fn();

        await updateMember(req, res, next);


        expect(membersServices.update).toHaveBeenCalledWith(req.params.id, req.body);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            code: 200,
            message: "Member updated successfully",
            data: {
                id: updatedMember._id,
                name: updatedMember.name,
                email: updatedMember.email,
                role: updatedMember.role,
                timestamp: {
                    createdAt: updatedMember.createdAt,
                    updatedAt: updatedMember.updatedAt
                }
            }
        });
    });
});
