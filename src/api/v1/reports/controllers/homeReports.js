
const reportsServices = require('../../../../lib/reports/index')
const { notFound } = require('../../../../utilis/error')
const defaults = require('../../../../config/defaults')
const transformed = require('../../../../utilis/generateResponse')


const homeReports = async (req, res, next) => {

    const month = req.query.month || defaults.month;
    const year = req.query.year || defaults.year;

    try {

        const {
            meals,
            products } = await reportsServices.wholeReports(year, month)

        const {
            meals_consumed,
            breakfast,
            lunch,
            dinner,
            meals_cost
        } = await transformed.mealsSummary(meals)

        const {
            totalProductCost,
            loss,
            profit,
        } = await transformed.productsSummay(products, meals_cost)
        const response = {
            code: 200,
            message: "Monthly report retrieved successfully",
            title: ` ${month}-${year} Reports`,
            month: month,
            totalProductCost,
            total_meals_consumed: meals_consumed,
            breakfast,
            lunch,
            dinner,
            total_cost_across_all_member: meals_cost,
            total_profit: profit,
            total_loss: loss,
            links: {
                self: `api/v1//monthly_reports`,
                all_products: `api/v1/products`
            }
        };

        res.status(200).json(response);
    } catch (err) {
        next(err);
    }
};

module.exports = homeReports