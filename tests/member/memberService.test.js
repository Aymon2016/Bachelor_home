const Member = require('../../src/model/Member')

const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const {
    findAll,
    memberExist,
    anyMemberExist,
    findMemberByEmail,
    createMember,
    count,
    findSingle,
    update,
    remove,
    changePassword, } = require('../../src/lib/members/index');

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
    await db.collection('members').insertMany([
        {
            name: 'Test User 1',
            email: 'testuser1@example.com',
        },
        {
            name: 'Test User 2',
            email: 'testuser2@example.com',
        },
    ]);
});

afterAll(async () => {
    await mongoose.connection.close();
    await mongoServer.stop();
});



describe('count funtion', () => {
    it('should return the count of members matching the search filter', async () => {
        await Member.create([
            {
                name: 'John Doe',
                email: 'johndoefdf@example.com',
                password: 'password123',
                role: 'Member',
            }
        ]);

        const search = 'john';

        const result = await count({ search });
        expect(result).toBe(1);
    })
})

describe('CREAte a user', () => {
    it('should return a user object', async () => {

        const memberData = {
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: 'password123',
            role: 'Member',
        };

        const createdMember = await createMember(memberData);
        const foundMember = await Member.findOne({ email: memberData.email });

        expect(createdMember).toEqual(expect.objectContaining(memberData));
        expect(foundMember).toEqual(expect.objectContaining(memberData));
    });

});


describe('anyMemberExist', () => {
    it('should return true for an existing member', async () => {
        const exists = await anyMemberExist();
        expect(exists).toBe(true);
    });
});

describe('memberExist', () => {
    it('should return true for an existing member', async () => {

        const email = 'testuser1@example.com';
        const exists = await memberExist(email);
        expect(exists).toBe(true);
    });

    it('should return false for a non-existing member', async () => {
        const email = 'nonexistent@example.com';
        const exists = await memberExist(email);
        expect(exists).toBe(false);
    });
});

describe('findmemberbyemail', () => {
    it('should return true for an existing member', async () => {

        const email = 'testuser1@example.com';
        const exists = await findMemberByEmail(email);
        expect(exists.email).toBe(email);
    });

    it('should return false for a non-existing member', async () => {
        const email = 'nonexistent@example.com';
        const exists = await findMemberByEmail(email);
        expect(exists).toBe(false);
    });
});

describe('findAll', () => {

    beforeEach(async () => {
        await Member.deleteMany({});
    });

    it('should return paginated, sorted, and filtered members', async () => {
        await Member.create([
            {
                name: 'John Doe',
                email: 'johndoe@erwexample.com',
                password: 'passwfeord123',
                role: 'Member',
            },
            {
                name: 'romon Doe',
                email: 'johndoe@erexample.com',
                password: 'passwerord123',
                role: 'Member',
            },
            {
                name: 'Joqwehneee Doe',
                email: 'johndoree@eexample.com',
                password: 'passwreord123',
                role: 'Member',
            },
        ]);

        const page = 1;
        const limit = 2;
        const sortType = 'asc';
        const sortBy = 'name';
        const search = 'john';

        const result = await findAll({ page, limit, sortType, sortBy, search });

        expect(result).toHaveLength(1);

    });

    it('should return an empty array if no members match the filter', async () => {

        await Member.create([
            {
                name: 'aymon Doe',
                email: 'johnwercddoe@example.com',
                password: 'password123',
                role: 'Member',
            },
            {
                name: 'romon Doe',
                email: 'johfewndoe@example.com',
                password: 'password123',
                role: 'Member',
            },
            {
                name: 'John Doe',
                email: 'johndevxcoe@example.com',
                password: 'pasesworfd123',
                role: 'Member',
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
        const createdMember = await Member.create({
            name: 'aymon Doe',
            email: 'johnwercuyghnjddoe@example.com',
            password: 'password123',
            role: 'Member',
        });

        const memberId = createdMember._id;

        const result = await findSingle(memberId);

        expect(result).toEqual(expect.objectContaining({
            name: 'aymon Doe',
            email: 'johnwercuyghnjddoe@example.com',
            password: 'password123',
            role: 'Member',
        }))
    })

    it('should return null if no member with the given ID is found', async () => {
        const result = await findSingle('dhnxj3493ewr');
        expect(result).toBeNull();
    });
});



describe('updateMember', () => {

    jest.mock('../../src/utilis/error', () => {
        return {
            notFound: jest.fn(() => new Error('Member Not Found')),
        };
    });

    jest.mock('../../src/model/Member', () => {
        return {
            Member: {
                findById: jest.fn(),
            },
        };
    });

    it('should update a member with valid data', async () => {
        const id = 'dhnxj3493ewr';
        const updateData = {
            name: 'Updated Name',

        };
        const mockMember = {
            _id: id,
            email: 'tesert@example.com',
            password: 'hashed-password',
            role: 'Admin',
        };
        const findByIdMock = jest.fn().mockResolvedValue(mockMember);
        Member.findById = findByIdMock;
        mockMember.save = jest.fn();

        const updatedMember = await update(id, updateData);
        expect(findByIdMock).toHaveBeenCalledWith(id);
        expect(updatedMember.name).toBe(updateData.name);
        expect(mockMember.save).toHaveBeenCalled();
    });

    it('should throw a not found error for an invalid ID', async () => {
        const id = 'invalid-member-id';
        const updateData = {
            name: 'Updated Name',
        };
        const findByIdMock = jest.fn().mockResolvedValue(null);
        Member.findById = findByIdMock;
        await expect(update(id, updateData)).rejects.toThrowError('Member Not Found');
    });
});



