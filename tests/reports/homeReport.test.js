const reportsServices = require('../../src/lib/reports/index');
const { notFound } = require('../../src/utilis/error');
const defaults = require('../../src/config/defaults');
const homeReports = require('../../src/api/v1/reports/controllers/homeReports');
const transformed = require('../../src/utilis/generateResponse')
jest.mock('../../src/lib/reports/index');
jest.mock('../../src/utilis/generateResponse')
const req = {
    query: {
        month: '09',
        year: '2023',
    },
};

const res = {
    status: jest.fn(() => res),
    json: jest.fn(),
};

const next = jest.fn();

describe('Home MemberReport controller', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should retrieve and return a member report', async () => {


        const meals = [
            {
                id: '64fabcd9dee2326d6e1cd2d4',
                member_id: '64fabcd9dee2326d6e1cd2d4',
                date: '2023-09-14',
                type: 'breakfast',
                price: 10.0,
                description: 'Delicious breakfast',
                createdAt: "23-3-200",
                updatedAt: "23-3-200,"
            }
        ]

        const products = [
            {
                _id: '64fabcd9dee2326d6e1cd2d4',
                name: "rice",
                price: "2990",
                description: "hello bro",
                createdAt: "2023 -09 - 16",
                updatedAt: "2023 -09 - 12"
            }
        ]
        reportsServices.wholeReports.mockResolvedValueOnce({ meals, products })

        const meals_Summary = {
            meals_consumed: 10,
            breakfast: 5,
            lunch: 2,
            dinner: 3,
            meals_cost: 500,
        }

        transformed.mealsSummary.mockResolvedValueOnce(meals_Summary)

        const product_Summary = {

            totalProductCost: 200,
            loss: 150,
            profit: 0
        }
        transformed.productsSummay.mockResolvedValueOnce(product_Summary)

        await homeReports(req, res, next);

        const month = req.query.month
        const year = req.query.year

        const reports = {
            code: 200,
            message: "Monthly report retrieved successfully",
            title: ` ${month}-${year} Reports`,
            month: month,
            totalProductCost: product_Summary.totalProductCost,
            total_meals_consumed: meals_Summary.meals_consumed,
            breakfast: meals_Summary.breakfast,
            lunch: meals_Summary.lunch,
            dinner: meals_Summary.dinner,
            total_cost_across_all_member: meals_Summary.meals_cost,
            total_profit: product_Summary.profit,
            total_loss: product_Summary.loss,
            links: {
                self: `api/v1//monthly_reports`,
                all_products: `api/v1/products`
            }
        }

        expect(reportsServices.wholeReports).toHaveBeenCalledWith(
            '2023',
            '09'
        );
        expect(transformed.mealsSummary).toHaveBeenCalledWith(meals)
        expect(transformed.productsSummay).toHaveBeenCalledWith(products, meals_cost = meals_Summary.meals_cost)

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(reports);
    });

    it('should handle errors and call next', async () => {
        const error = new Error('Test error');
        reportsServices.wholeReports.mockRejectedValueOnce(error);

        await homeReports(req, res, next);

        expect(reportsServices.wholeReports).toHaveBeenCalledWith(
            '2023',
            '09'
        );

        expect(next).toHaveBeenCalledWith(error);
    });
});
