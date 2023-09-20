const membersService = require('../members/index')
const mealsSevice = require('../meals/index')
const transections = require('../transections/index')
const defaults = require('../../config/defaults')
const { notFound } = require('../../utilis/error')
const productsService = require('../products/index')

const singleMemberReport = async (member_id, year = defaults.year, month = defaults.month) => {

    const member = await membersService.findSingle(member_id)
    if (!member) {
        throw notFound("no member found of this member_id")
    }

    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);
    endDate.setHours(23, 59, 59, 999);

    const meals = await mealsSevice.find(member_id, startDate, endDate)

    if (!meals) {
        throw notFound('no meals found of this member_id')
    }

    const transection = await transections.find(member_id, startDate, endDate)
    if (!member) {
        throw notFound("no transection found of this member_id")
    }


    return {
        member,
        meals,
        transection
    }
}

const wholeReports = async (year = defaults.year, month = defaults.month) => {


    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);
    endDate.setHours(23, 59, 59, 999);

    const meals = await mealsSevice.findWithOutId(startDate, endDate)

    if (!meals) {
        throw notFound('no meals found of this member_id')
    }

    const products = await productsService.find(startDate, endDate)
    if (!products) {
        throw notFound('Product not found')
    }
    return {
        meals,
        products
    }

}

module.exports = {
    singleMemberReport,
    wholeReports,
}