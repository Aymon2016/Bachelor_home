const mealsServices = require('../../../../lib/meals/index')
const defaults = require('../../../../config/defaults')
const getPagination = require('../../../../utilis/pagination')
const { getHeteOASForAllItems } = require('../../../../utilis/Heteoas')
const transformed = require('../../../../utilis/generateResponse')
const { notFound } = require('../../../../utilis/error')

const find_allOfMember = async (req, res, next) => {

    const page = req.query.page || defaults.page;
    const limit = req.query.limit || defaults.limit;
    const sortType = req.query.sort_type || defaults.sortType;
    const sortBy = req.query.sort_by || defaults.sortBy;


    const { member_id } = req.params

    try {

        const meals = await mealsServices.findAllOfMember(member_id, {
            page,
            limit,
            sortType,
            sortBy
        })

        if (meals.length === 0) {
            throw notFound('Meals Not Found')
        }
        // transformed data
        const data = await transformed.mealsData(meals)
        // total member count
        const totalItems = await mealsServices.countByGivenMemberId(member_id);
        // pagination make
        const pagination = getPagination(totalItems, page, limit)

        const links = getHeteOASForAllItems({ url: req.url, path: req.path, query: req.query, hasNext: !!pagination.next_page, hasPrev: !!pagination.prev_page, page })
        const response = {
            code: 200,
            message: 'Meals retrieved successfull',
            data: data,
            pagination: pagination,
            links: links
        };

        res.status(200).json(response);
    } catch (err) {
        next(err);
    }
};

module.exports = find_allOfMember