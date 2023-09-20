const reportsServices = require('../../../../lib/reports/index')
const { notFound } = require('../../../../utilis/error')
const defaults = require('../../../../config/defaults')

const getPagination = require('../../../../utilis/pagination')
const { getHeteOASForAllItems } = require('../../../../utilis/Heteoas')
const transformed = require('../../../../utilis/generateResponse')

const singleMemberReport = async (req, res, next) => {

    const { member_id } = req.params
    const month = req.query.month || defaults.month;
    const year = req.query.year || defaults.year;

    try {

        const {
            member,
            meals,
            transection } = await reportsServices.singleMemberReport(member_id, year, month)

        const meals_Summary = await transformed.mealsSummary(meals)
        const account_Summary = await transformed.accountsSummary(transection, totalCost = meals_Summary.meals_cost)

        const response = {
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
                meals: `/api/v1/members/${member_id}/meals`,
                self_report: `api/v1/monthly_reports/members/${member_id}`
            }
        };

        res.status(200).json(response);
    } catch (err) {
        next(err);
    }
};

module.exports = singleMemberReport