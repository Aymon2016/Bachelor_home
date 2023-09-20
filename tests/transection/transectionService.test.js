const { deposite, count, find, findAllOfMember, findSingle, update } = require('../../src/lib/transections/index')
const Transection = require('../../src/model/Transection');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const { resourceConflict, notFound, serverError } = require('../../src/utilis/error')

let db;
let mongoServer;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create()
    const mongoUri = mongoServer.getUri();


    await mongoose.connect(mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    console.log(`MongoDB server is running at`);
    db = mongoose.connection;

});

afterAll(async () => {
    await mongoose.connection.close();
    await mongoServer.stop();
});


describe('createMeal function', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should create a transection if have member_id and deposit amount', async () => {


        const member_id = '64fabcd9dee2326d6e1cd2d4'
        const deposit_amount = 200

        await deposite(member_id, deposit_amount)
        const result = await Transection.find()

        expect(result).toHaveLength(1);
    });


});

describe('findSingle Function', () => {

    jest.mock('../../src/model/Transection');
    Transection.findById = jest.fn()
    jest.mock('../../src/utilis/error')

    it('should return a Transection when found', async () => {

        const mockTransection = {
            _id: '64fabcd9dee2326d6e1cd2d5',
            member_id: '64fabcd9dee2326d6e1cd2d4',
            deposit_amount: 200,
            createdAt: "2023 -09 - 16",
            updatedAt: "2023 -09 - 12"
        };

        Transection.findById.mockResolvedValue(mockTransection);

        const transection = await findSingle('64fabcd9dee2326d6e1cd2d5');

        expect(Transection.findById).toHaveBeenCalledWith('64fabcd9dee2326d6e1cd2d5');
        expect(transection).toEqual(mockTransection);
    })
    it('should return null when meal is not found', async () => {

        Transection.findById.mockResolvedValue(null);

        try {
            await findSingle('64fabcd9dee2326d6e1cd2d5');
            expect(Transection.findById).toHaveBeenCalledWith('64fabcd9dee2326d6e1cd2d5');
        } catch (error) {
            expect(error).toBeInstanceOf(Error);
            expect(error.message).toBe('No record found with this id!');
            expect(error.status).toBe(404);
        }
    });
})


describe('update Function', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should throw an error when the meal is not found', async () => {
        Transection.findById.mockResolvedValue(null)
        try {
            await update('64fabcd9dee2326d6e1cd2d4');
        } catch (error) {
            expect(error.message).toBe('Transection not Found');
            expect(error.status).toBe(404);
        }
    });


});

describe('count transection funtion', () => {

    beforeEach(async () => {
        jest.clearAllMocks();
        await Transection.deleteMany({});
    });
    it('should return the count of transection ', async () => {
        await deposite(member_id = '64fabcd9dee2326d6e1cd2d4', deposit_amount = 200);

        const result = await count();
        expect(result).toBe(1);
    })
})

describe('findAll transection of a memebr_id', () => {

    beforeEach(async () => {
        jest.clearAllMocks();
        await Transection.deleteMany({});
    });

    it('should retrieve transection based memberid', async () => {
        const page = 1;
        const limit = 10;
        const sortType = 'asc';
        const sortBy = 'dsc';
        const member_id = '64fabcd9dee2326d6e1cd2d4'

        await deposite('64fabcd9dee2326d6e1cd2d4', 200)

        const transection = await findAllOfMember(member_id, {
            page,
            limit,
            sortType,
            sortBy,

        });


        expect(transection).toHaveLength(1);

    });

});


describe('find function', () => {
    beforeEach(async () => {
        jest.clearAllMocks();
        await Transection.deleteMany({});
    });
    it('should find transactions within the specified date range', async () => {

        const member_id = '64fabcd9dee2326d6e1cd2d4';
        const startDate = '2023-09-01'
        const endDate = '2023-09-30'

        const testData = [
            {
                _id: '64fabcd9dee2326d6e1cd2d1',
                member_id: '64fabcd9dee2326d6e1cd2d4',
                deposit_amount: 50,
                createdAt: '2023-09-15',
                updatedAt: '2023-09-15',
            },
            {

                _id: '64fabcd9dee2326d6e1cd2d2',
                member_id: '64fabcd9dee2326d6e1cd2d4',
                deposit_amount: 30,
                createdAt: '2023-09-15',
                updatedAt: '2023-09-15',
            },

            {

                _id: '64fabcd9dee2326d6e1cd2d3',
                member_id: '64fabcd9dee2326d6e1cd2d4',
                deposit_amount: 200,
                createdAt: '2023-09-15',
                updatedAt: '2023-09-15',
            }
        ]

        await Transection.insertMany(testData)

        const result = await find(member_id, startDate, endDate);

        expect(result).toHaveLength(3);
        expect(result[0].deposit_amount).toBe(50);
        expect(result[1].deposit_amount).toBe(30);
    });
});