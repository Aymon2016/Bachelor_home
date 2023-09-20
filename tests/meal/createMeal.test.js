


const createMeal = require('../../src/api/v1/meals/controllers/create')
const { create } = require('../../src/lib/meals/index');


jest.mock('../../src/lib/meals/index');

const req = {
    body: {
        member_id: '123',
        date: '2023-09-14',
        type: 'Breakfast',
        price: 10.0,
        description: 'Delicious breakfast',
    },
};
const res = {
    status: jest.fn(() => res),
    json: jest.fn(),
};
const next = jest.fn();

describe('Create meal controller', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    })
    afterEach(() => {
        jest.clearAllMocks();
    });

    create.mockResolvedValue({

        _id: 'mocked-id',
        member_id: '123',
        date: '2023-09-14',
        type: 'Breakfast',
        price: 10.0,
        description: 'Delicious breakfast',
        createdAt: "2023 -09 - 16",
        updatedAt: "2023 -09 - 12"

    })
    it('should create and return a response', async () => {
        await createMeal(req, res, next);

        expect(create).toHaveBeenCalledWith({
            member_id: '123',
            date: '2023-09-14',
            type: 'Breakfast',
            price: 10.0,
            description: 'Delicious breakfast',
        })
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({
            code: 201,
            message: "Create meals successfull",
            data: {
                id: 'mocked-id',
                member_id: '123',
                date: '2023-09-14',
                type: 'Breakfast',
                price: 10.0,
                description: 'Delicious breakfast',
                timestamp: {
                    createdAt: "2023 -09 - 16",
                    updatedAt: "2023 -09 - 12"
                },
            },
            links: {
                self: 'api/v1/meals'
            }
        })
    })

    it('should handle errors and call next', async () => {
        const error = new Error('Test error');
        create.mockRejectedValueOnce(error);

        await createMeal(req, res, next);

        expect(create).toHaveBeenCalledWith({
            member_id: '123',
            date: '2023-09-14',
            type: 'Breakfast',
            price: 10.0,
            description: 'Delicious breakfast',
        })

        expect(next).toHaveBeenCalledWith(error);
    })


})