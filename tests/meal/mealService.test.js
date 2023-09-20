const { create, count, findAll, findAllOfMember, findSingle, remove, updateAndCreate } = require('../../src/lib/meals/index')
const Meal = require('../../src/model/Meal');
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
    await db.collection('meals').insertMany([
        {
            _id: '64fabcd9dee2326d6e1cd2d4',
            member_id: '64fabcd9dee2326d6e1cd1d4',
            date: '2023-09-14',
            type: 'Lunch',
            price: 15.0,
            description: 'Delicious lunch',
            createdAt: '2023-09-14',
            updatedAt: '2023-09-14',
        }
    ]);
});

afterAll(async () => {
    await mongoose.connection.close();
    await mongoServer.stop();
});


describe('createMeal function', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should handle conflict error when an existing meal is found', async () => {

        const mealData = {
            member_id: '64fabcd9dee2326d6e1cd2d4',
            date: '2023-09-14',
            type: 'breakfast',
            price: 10.0,
            description: 'Delicious breakfast',
        }

        try {
            await create({ ...mealData })
        } catch (error) {
            expect(error).toEqual(resourceConflict('Meal with the same date already exists for this member'));
        }

    });

    it('should create a meal when an existing meal is not found', async () => {

        const mealData = {
            member_id: '64fabcd9dee2326d6e1cd2d4',
            date: '2023-09-15',
            type: 'breakfast',
            price: 10.0,
            description: 'Delicious breakfast',
        }

        await create({ ...mealData })
        const result = await Meal.find()

        expect(result).toHaveLength(3);

    });
});
describe('count meals funtion', () => {

    beforeEach(async () => {
        jest.clearAllMocks();
        await Meal.deleteMany({});
    });
    it('should return the count of meals matching the search filter', async () => {
        await Meal.create([
            {
                member_id: '64fabcd9dee2326d6e1cd2d4',
                date: '2023-09-14',
                type: 'breakfast',
                price: 10.0,
                description: 'Delicious breakfast',
            }
        ]);

        const search = 'breakfast';

        const result = await count({ search });
        expect(result).toBe(1);
    })
})


describe('findAll meal', () => {
    it('should retrieve meals based on search', async () => {
        const page = 1;
        const limit = 10;
        const sortType = 'asc';
        const sortBy = 'description';
        const search = 'Delicious breakfast';
        const meals = await findAll({
            page,
            limit,
            sortType,
            sortBy,
            search,
        });

        expect(meals).toHaveLength(1);
        expect(meals[0].description).toBe('Delicious breakfast');
    });

});

describe('findAll meal of a memebr_id', () => {
    it('should retrieve meals based memberid', async () => {
        const page = 1;
        const limit = 10;
        const sortType = 'asc';
        const sortBy = 'description';
        const member_id = '64fabcd9dee2326d6e1cd2d4'

        const meals = await findAllOfMember(member_id, {
            page,
            limit,
            sortType,
            sortBy,

        });

        const mockMeal = {
            member_id: '64fabcd9dee2326d6e1cd2d4',
            date: '2023-09-14',
            type: 'Breakfast',
            price: 10.0,
            description: 'Delicious breakfast',
        }

        expect(meals).toHaveLength(1);

    });

});


describe('findSingle Function', () => {

    jest.mock('../../src/model/Meal');
    Meal.findById = jest.fn()
    it('should return a meal when found', async () => {

        const mockMeal = {
            _id: '64fabcd9dee2326d6e1cd2d4',
            member_id: '64fabcd9dee2326d6e1cd1d4',
            date: '2023-09-14',
            type: 'Lunch',
            price: 15.0,
            description: 'Delicious lunch',
            createdAt: '2023-09-14',
            updatedAt: '2023-09-14',
        };

        Meal.findById.mockResolvedValue(mockMeal);

        const meal = await findSingle('64fabcd9dee2326d6e1cd2d4');

        expect(Meal.findById).toHaveBeenCalledWith('64fabcd9dee2326d6e1cd2d4');
        expect(meal).toEqual(mockMeal);
    })
    it('should return null when meal is not found', async () => {

        Meal.findById.mockResolvedValue(null);

        const meal = await findSingle('64fabcd9dee2326d6e1cd2d4');

        expect(Meal.findById).toHaveBeenCalledWith('64fabcd9dee2326d6e1cd2d4');
        expect(meal).toBeNull();
    });
})


describe('remove Function', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    jest.mock('../../src/model/Meal')
    it('should throw an error when the meal is not found', async () => {
        try {
            await remove('64fabcd9dee2326d6e1cd2d4');
        } catch (error) {
            expect(error.message).toBe('Resources Not Found');
            expect(error.status).toBe(404);
        }
    });

    it('should throw an error when an internal error occurs', async () => {
        const mockMeal = {
            _id: '64fabcd9dee2326d6e1cd2d4',
            member_id: '64fabcd9dee2326d6e1cd1d4',
            date: '2023-09-14',
            type: 'lunch',
            price: 15.0,
            description: 'Updated lunch',
            createdAt: '2023-09-14',
            updatedAt: '2023-09-15',
        };

        Meal.findById.mockResolvedValue(mockMeal)
        try {
            await remove('invalid-id');
        } catch (error) {
            expect(error.message).toBe('Internal Server Error');
            expect(error.status).toBe(500);
        }
    });
});


describe('update Function', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should throw an error when the meal is not found', async () => {
        Meal.findById.mockResolvedValue(null)
        try {
            await updateAndCreate('64fabcd9dee2326d6e1cd2d4');
        } catch (error) {
            expect(error.message).toBe('Meal not Found');
            expect(error.status).toBe(404);
        }
    });


});

