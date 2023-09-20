

const {
    Data,
    mealsData,
    productsData,
    noticesData,
    mealsSummary,
    accountsSummary,
    productsSummay, } = require('../../src/utilis/generateResponse');

describe(' genereateResponse data funtion', () => {
    it('should return an empty array for empty input', async () => {
        const result = await Data([]);
        expect(result).toEqual([]);
    });

    it('should transform member objects correctly', async () => {
        const members = [
            {
                _id: '1',
                name: 'John Doe',
                email: 'john@example.com',
                role: 'User',
                createdAt: '2023-09-14T00:00:00.000Z',
                updatedAt: '2023-09-15T00:00:00.000Z',
            }

        ];

        const expectedTransformedData = [
            {
                id: '1',
                name: 'John Doe',
                email: 'john@example.com',
                role: 'User',
                timestamp: {
                    createdAt: '2023-09-14T00:00:00.000Z',
                    updatedAt: '2023-09-15T00:00:00.000Z',
                },
            },

        ];

        const result = await Data(members);
        expect(result).toEqual(expectedTransformedData);
    });
});
describe(' genereateResponse mealsData funtion', () => {
    it('should return an empty array for empty input', async () => {
        const result = await mealsData([]);
        expect(result).toEqual([]);
    });

    it('should transform member objects correctly', async () => {
        const mealsdata = [
            {
                member_id: "oiwejrfj",
                date: "2-34-200",
                type: "breakfast",
                price: 520,
                description: "hello description",
                createdAt: '2023-09-14T00:00:00.000Z',
                updatedAt: '2023-09-15T00:00:00.000Z',
            }

        ];

        const expectedTransformedData = [
            {
                member_id: "oiwejrfj",
                date: "2-34-200",
                type: "breakfast",
                price: 520,
                description: "hello description",
                timestamp: {
                    createdAt: '2023-09-14T00:00:00.000Z',
                    updatedAt: '2023-09-15T00:00:00.000Z',
                },
            },

        ];

        const result = await mealsData(mealsdata);
        expect(result).toEqual(expectedTransformedData);
    });
});
describe(' genereateResponse mealsData funtion', () => {
    it('should return an empty array for empty input', async () => {
        const result = await productsData([]);
        expect(result).toEqual([]);
    });

    it('should transform member objects correctly', async () => {
        const products = [
            {
                name: 'hel',
                price: 25,
                description: 'heohwnefjd',
                createdAt: '2023-09-14T00:00:00.000Z',
                updatedAt: '2023-09-15T00:00:00.000Z',
            }

        ];

        const expectedTransformedData = [
            {
                name: 'hel',
                price: 25,
                description: 'heohwnefjd',
                timestamp: {
                    createdAt: '2023-09-14T00:00:00.000Z',
                    updatedAt: '2023-09-15T00:00:00.000Z',
                },
            },

        ];

        const result = await productsData(products);
        expect(result).toEqual(expectedTransformedData);
    });
});
describe(' genereateResponse mealsData funtion', () => {
    it('should return an empty array for empty input', async () => {
        const result = await noticesData([]);
        expect(result).toEqual([]);
    });

    it('should transform member objects correctly', async () => {
        const notices = [
            {
                title: 'hello',
                body: 'this is bolyd',
                createdAt: '2023-09-14T00:00:00.000Z',
                updatedAt: '2023-09-15T00:00:00.000Z',
            }

        ];

        const expectedTransformedData = [
            {
                title: 'hello',
                body: 'this is bolyd',
                timestamp: {
                    createdAt: '2023-09-14T00:00:00.000Z',
                    updatedAt: '2023-09-15T00:00:00.000Z',
                },
            },

        ];

        const result = await noticesData(notices);
        expect(result).toEqual(expectedTransformedData);
    });
});



describe('mealsSummary funtion for transformed meals obj', () => {
    it('should return summary with zero meals and cost for empty input', async () => {
        const result = await mealsSummary([]);
        expect(result).toEqual({
            meals_consumed: 0,
            breakfast: 0,
            lunch: 0,
            dinner: 0,
            meals_cost: 0,
        });
    });

    it('should calculate meal summary correctly for a list of meals', async () => {
        const meals = [
            { type: 'breakfast', price: 10 },
            { type: 'lunch', price: 15 },
            { type: 'dinner', price: 20 },
            { type: 'breakfast', price: 12 },

        ];

        const result = await mealsSummary(meals);
        expect(result).toEqual({
            meals_consumed: 4,
            breakfast: 2,
            lunch: 1,
            dinner: 1,
            meals_cost: 57,
        });
    });
});


describe('accountsSummary', () => {
    it('should calculate account summary correctly when totalDeposit is greater than totalCost', async () => {
        const transactions = [
            { deposit_amount: 50 },
            { deposit_amount: 30 },

        ];
        const totalCost = 60;

        const result = await accountsSummary(transactions, totalCost);
        expect(result).toEqual({
            total_deposit: 80,
            total_cost: 60,
            due: 0,
            return: 20,
        });
    });

    it('should calculate account summary correctly when totalDeposit is less than totalCost', async () => {
        const transactions = [
            { deposit_amount: 20 },
            { deposit_amount: 10 },

        ];
        const totalCost = 100;

        const result = await accountsSummary(transactions, totalCost);
        expect(result).toEqual({
            total_deposit: 30,
            total_cost: 100,
            due: 70,
            return: 0,
        });
    });

    it('should calculate account summary correctly when totalDeposit is equal to totalCost', async () => {
        const transactions = [
            { deposit_amount: 40 },
            { deposit_amount: 60 },

        ];
        const totalCost = 100;

        const result = await accountsSummary(transactions, totalCost);
        expect(result).toEqual({
            total_deposit: 100,
            total_cost: 100,
            due: 0,
            return: 0,
        });
    });
});


describe('productsSummay', () => {
    it('should calculate product summary correctly when totalProductCost is greater than meals_cost', async () => {
        const products = [
            { price: 50 },
            { price: 30 },

        ];
        const meals_cost = 60;

        const result = await productsSummay(products, meals_cost);
        expect(result).toEqual({
            totalProductCost: 80,
            loss: 20,
            profit: 0,
        });
    });

    it('should calculate product summary correctly when totalProductCost is less than meals_cost', async () => {
        const products = [
            { price: 20 },
            { price: 10 },

        ];
        const meals_cost = 100;

        const result = await productsSummay(products, meals_cost);
        expect(result).toEqual({
            totalProductCost: 30,
            loss: 0,
            profit: 70,
        });
    });

    it('should calculate product summary correctly when totalProductCost is equal to meals_cost', async () => {
        const products = [
            { price: 40 },
            { price: 60 },

        ];
        const meals_cost = 100;

        const result = await productsSummay(products, meals_cost);
        expect(result).toEqual({
            totalProductCost: 100,
            loss: 0,
            profit: 0,
        });
    });
});
