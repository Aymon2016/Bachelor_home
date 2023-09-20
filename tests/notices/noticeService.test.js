
const { create, count, findAll, findSingle, update, remove } = require('../../src/lib/notices/index')
const Meal = require('../../src/model/Meal');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const { resourceConflict, notFound, serverError } = require('../../src/utilis/error');
const Notice = require('../../src/model/Notice');

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


describe('createNotice function', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should create a notice ', async () => {

        const noticeData = {
            title: "helo",
            body: 'this is a body'

        }
        const notice = await create({ ...noticeData })
        expect(notice.title).toBe(noticeData.title);
        expect(notice.body).toBe(noticeData.body);
        const result = await Notice.find()
        expect(result).toHaveLength(1);

    });


});

describe('count funtion', () => {

    it('should return the count of Notices matching the search filter', async () => {
        await Notice.deleteMany()
        await Notice.create([
            {
                title: "helo",
                body: 'this is a body'
            }
        ]);

        const search = 'helo';

        const result = await count({ search });
        expect(result).toBe(1);
    })
})

describe('findAll', () => {

    beforeEach(async () => {
        await Notice.deleteMany({});
    });

    it('should return paginated, sorted, and filtered notices', async () => {
        await Notice.create([
            {
                title: "helo",
                body: 'this is a body'
            },
            {
                title: "gas is finish",
                body: 'this is a body'
            },
            {
                title: "gas is finished",
                body: 'this is a body'
            },
        ]);

        const page = 1;
        const limit = 2;
        const sortType = 'asc';
        const sortBy = 'name';
        const search = 'helo';

        const result = await findAll({ page, limit, sortType, sortBy, search });

        expect(result).toHaveLength(1);

    });

    it('should return an empty array if no members match the filter', async () => {

        await Notice.create([
            {
                title: "helo",
                body: 'this is a body'
            },
            {
                title: "gas is finish",
                body: 'this is a body'
            },
            {
                title: "gas is finished",
                body: 'this is a body'
            },
        ]);

        const page = 1;
        const limit = 2;
        const sortType = 'asc';
        const sortBy = 'name';
        const search = 'unknown';

        const result = await findAll({ page, limit, sortType, sortBy, search });
        expect(result).toHaveLength(0);
    });
});

describe('findSingle', () => {
    it('should return a single member by ID', async () => {
        const createdNotice = await Notice.create({
            title: "helo",
            body: 'this is a body'
        });

        const id = createdNotice._id;

        const result = await findSingle(id);

        expect(result).toEqual(expect.objectContaining({
            title: "helo",
            body: 'this is a body'
        }))
    })

    it('should return null if no member with the given ID is found', async () => {
        const result = await findSingle('dhnxj3493ewr');
        expect(result).toBeNull();
    });
});

describe('updateNotice', () => {

    jest.mock('../../src/utilis/error', () => {
        return {
            notFound: jest.fn(() => new Error('Notice Not Found')),
        };
    });

    jest.mock('../../src/model/Member', () => {
        return {
            Member: {
                findById: jest.fn(),
            },
        };
    });

    it('should update a notice with valid data', async () => {
        const id = 'dhnxj3493ewr';
        const updateData = {
            title: 'pani bill dite hobe',

        };
        const mockNotice = {
            _id: id,
            title: 'gas is finish',
            body: "gas er tak diba noile na keye morte hobe"
        };
        const findByIdMock = jest.fn().mockResolvedValue(mockNotice);
        Notice.findById = findByIdMock;
        mockNotice.save = jest.fn();

        const updatedNotice = await update(id, updateData);
        expect(findByIdMock).toHaveBeenCalledWith(id);
        expect(updatedNotice.title).toBe(updateData.title);
        expect(mockNotice.save).toHaveBeenCalled();
    });

    it('should throw a not found error for an invalid ID', async () => {
        const id = 'invalid-member-id';
        const updateData = {
            title: 'pani bill dite hobe',
        };
        const findByIdMock = jest.fn().mockResolvedValue(null);
        Notice.findById = findByIdMock;
        await expect(update(id, updateData)).rejects.toThrowError('Notice Not Found');
    });
});

describe('remove Function', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    jest.mock('../../src/model/Notice')
    it('should throw an error when the Notice is not found', async () => {
        try {
            await remove('64fabcd9dee2326d6e1cd2d4');
        } catch (error) {
            expect(error.message).toBe('Resources Not Found');
            expect(error.status).toBe(404);
        }
    });

    it('should throw an error when an internal error occurs', async () => {
        const mockNotice = {
            _id: '64fabcd9dee2326d6e1cd2d4',
            title: 'gas is finish',
            body: "gas er tak diba noile na keye morte hobe",
            createdAt: '2023-09-14',
            updatedAt: '2023-09-15',
        };

        Notice.findById.mockResolvedValue(mockNotice)
        try {
            await remove('invalid-id');
        } catch (error) {
            expect(error.message).toBe('Internal Server Error');
            expect(error.status).toBe(500);
        }
    });
});