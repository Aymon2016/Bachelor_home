const Product = require('../../src/model/Product')

const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const {
    create,
    findAll,
    count,
    findSingle,
    update,
    remove,
    find
} = require('../../src/lib/products/index');

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


describe('create product function', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });


    it('should create a meal with valid name price description ', async () => {

        const productData = {
            name: "rice",
            price: "2990",
            description: "hello bro",
        }

        await create({ ...productData })
        const result = await Product.find()

        expect(result).toHaveLength(1);

    });
});
describe('count products funtion', () => {

    beforeEach(async () => {
        jest.clearAllMocks();
        await Product.deleteMany({});
    });
    it('should return the count of product matching the search filter', async () => {
        await Product.create([

            {
                name: "tomato",
                price: "2990",
                description: "hello bro",
            }
        ]);

        const search = 'tomato';

        const result = await count({ search });
        expect(result).toBe(1);
    })
})


describe('findAll product', () => {
    it('should retrieve all products based on search', async () => {
        const page = 1;
        const limit = 10;
        const sortType = 'asc';
        const sortBy = 'dsc';
        const search = 'tomato';
        const products = await findAll({
            page,
            limit,
            sortType,
            sortBy,
            search,
        });

        expect(products).toHaveLength(1);
        expect(products[0].name).toBe('tomato');
    });

});

describe('findSingle Function', () => {

    jest.mock('../../src/model/Product');
    Product.findById = jest.fn()
    it('should return a product when found', async () => {

        const mockProduct = {
            _id: '64fabcd9dee2326d6e1cd2d4',
            name: "rice",
            price: "2990",
            description: "hello bro",
            createdAt: '2023-09-14',
            updatedAt: '2023-09-14',
        };

        Product.findById.mockResolvedValue(mockProduct);

        const product = await findSingle('64fabcd9dee2326d6e1cd2d4');

        expect(Product.findById).toHaveBeenCalledWith('64fabcd9dee2326d6e1cd2d4');
        expect(product).toEqual(mockProduct);
    })
    it('should return null when product is not found', async () => {

        Product.findById.mockResolvedValue(null);

        const product = await findSingle('64fabcd9dee2326d6e1cd2d4');

        expect(Product.findById).toHaveBeenCalledWith('64fabcd9dee2326d6e1cd2d4');
        expect(product).toBeNull();
    });
})


describe('remove Function', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    jest.mock('../../src/model/Product')
    it('should throw an error when the product is not found', async () => {
        try {
            await remove('64fabcd9dee2326d6e1cd2d4');
        } catch (error) {
            expect(error.message).toBe('Resources Not Found');
            expect(error.status).toBe(404);
        }
    });

    it('should throw an error when an internal error occurs', async () => {
        const mockProduct = {
            _id: '64fabcd9dee2326d6e1cd2d4',
            name: "rice",
            price: "2990",
            description: "hello bro",
            createdAt: '2023-09-14',
            updatedAt: '2023-09-14',
        };

        Product.findById.mockResolvedValue(mockProduct)
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

    it('should throw an error when the product is not found', async () => {
        Product.findById.mockResolvedValue(null)
        try {
            await update('64fabcd9dee2326d6e1cd2d4');
        } catch (error) {
            expect(error.message).toBe('Product Not Found');
            expect(error.status).toBe(404);
        }
    });


});


