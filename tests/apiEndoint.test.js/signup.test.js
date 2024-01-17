
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const request = require('supertest');
const app = require('../../src/app');
const Member = require('../../src/model/Member')
let db;
let mongoServer;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create()
    const mongoUri = mongoServer.getUri();


    await mongoose.connect(mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    db = mongoose.connection;



});

afterAll(async () => {
    await mongoose.connection.close();
    await mongoServer.stop();
});



describe('signup Endpoints', () => {

    const customHeaders = {
        'Content-Type': 'application/json'
    }
    it('should create a new resource', async () => {

        const res = await request(app)
            .post('/api/v1/auth/signup')
            .set('Authorization', 'Bearer yourAccessToken')
            .set('Content-Type', 'application/json')
            .send({
                name: 'aymon',
                email: 'mdaiman2016@gmail.com',
                password: 'aymon123'
            });

        expect(res.status).toEqual(201);
    });

});

