


const createNotice = require('../../src/api/v1/notices/controllers/create')
const { create } = require('../../src/lib/notices/index');


jest.mock('../../src/lib/notices/index');

const req = {
    body: {
        title: 'gas is finish',
        body: 'hello bro gast is finish'
    },
};
const res = {
    status: jest.fn(() => res),
    json: jest.fn(),
};
const next = jest.fn();

describe('Create Notice controller', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    })
    afterEach(() => {
        jest.clearAllMocks();
    });

    const mockNotice = {
        _id: '64fabcd9dee2326d6e1cd2d4',
        title: 'gas is finish',
        body: 'hello bro gast is finish',
        createdAt: "2023 -09 - 16",
        updatedAt: "2023 -09 - 12"
    }

    create.mockResolvedValue(mockNotice)

    it('should create and return a response', async () => {
        await createNotice(req, res, next);

        expect(create).toHaveBeenCalledWith({
            title: 'gas is finish',
            body: 'hello bro gast is finish',
        })
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({
            code: 201,
            message: " Notice announched successfull ",
            data: {
                id: mockNotice._id,
                title: mockNotice.title,
                body: mockNotice.body,
                timestamp: {
                    createdAt: mockNotice.createdAt,
                    updatedAt: mockNotice.updatedAt
                }
            },
            links: {
                self: 'api/v1/notices/64fabcd9dee2326d6e1cd2d4'
            }
        })
    })

    it('should handle errors and call next', async () => {
        const error = new Error('Test error');
        create.mockRejectedValueOnce(error);

        await createNotice(req, res, next);

        expect(create).toHaveBeenCalledWith({

            title: 'gas is finish',
            body: 'hello bro gast is finish',

        })

        expect(next).toHaveBeenCalledWith(error);
    })


})