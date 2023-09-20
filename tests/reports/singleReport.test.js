const reportsServices = require('../../src/lib/reports/index');
const { notFound } = require('../../src/utilis/error');
const defaults = require('../../src/config/defaults');
const singleMemberReport = require('../../src/api/v1/reports/controllers/singleMemberReport');
const transformed = require('../../src/utilis/generateResponse')
jest.mock('../../src/lib/reports/index');
jest.mock('../../src/utilis/generateResponse')
const req = {
    params: {
        member_id: '64fabcd9dee2326d6e1cd2d4',
    },
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

describe('singleMemberReport controller', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should retrieve and return a member report', async () => {

        const member = {
            _id: '64fabcd9dee2326d6e1cd2d4',
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: 'password123',
            role: 'Member',
            createdAt: "23-3-200",
            updatedAt: "23-3-200"
        }
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
        const transection = [
            {
                member_id: '64fabcd9dee2326d6e1cd2d4',
                deposit_amount: '2000',
                createdAt: "23-3-200",
                updatedAt: "23-3-200,"
            }
        ]
        reportsServices.singleMemberReport.mockResolvedValueOnce({ member, meals, transection })

        const meals_Summary = {
            meals_consumed: 10,
            breakfast: 5,
            lunch: 2,
            dinner: 3,
            meals_cost: 500,
        }

        transformed.mealsSummary.mockResolvedValueOnce(meals_Summary)

        const account_Summary = {
            total_deposit: 200,
            total_cost: 150,
            return: 50,
        }
        transformed.accountsSummary.mockResolvedValueOnce(account_Summary)

        await singleMemberReport(req, res, next);
        const month = req.query.month
        const reports = {
            code: 200,
            message: "Report retrived successfull",
            month: month,
            member_data: {
                id: member._id,
                name: member.name,
                email: member.email
            },
            meals_Summary,
            account_Summary,
            links: {
                meals: `/api/v1/members/${member._id}/meals`,
                self_report: `api/v1/monthly_reports/members/${member._id}`
            }
        }

        expect(reportsServices.singleMemberReport).toHaveBeenCalledWith(
            '64fabcd9dee2326d6e1cd2d4',
            '2023',
            '09'
        );
        expect(transformed.mealsSummary).toHaveBeenCalledWith(meals)
        expect(transformed.accountsSummary).toHaveBeenCalledWith(transection, totalCost = 500)

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(reports);
    });

    it('should handle errors and call next', async () => {
        const error = new Error('Test error');
        reportsServices.singleMemberReport.mockRejectedValueOnce(error);

        await singleMemberReport(req, res, next);

        expect(reportsServices.singleMemberReport).toHaveBeenCalledWith(
            '64fabcd9dee2326d6e1cd2d4',
            '2023',
            '09'
        );

        expect(next).toHaveBeenCalledWith(error);
    });
});
