const mealsServices = require('../../../../lib/meals/index')
const defaults = require('../../../../config/defaults')
const getPagination = require('../../../../utilis/pagination')
const { getHeteOASForAllItems } = require('../../../../utilis/Heteoas')
const transformed = require('../../../../utilis/generateResponse')
const { notFound } = require('../../../../utilis/error')

const find_all = async (req, res, next) => {

    const page = req.query.page || defaults.page;
    const limit = req.query.limit || defaults.limit;
    const sortType = req.query.sort_type || defaults.sortType;
    const sortBy = req.query.sort_by || defaults.sortBy;
    const search = req.query.search || defaults.search;


    try {
        const meals = await mealsServices.findAll({
            page,
            limit,
            sortType,
            sortBy,
            search
        })

        if (meals.length === 0) {
            throw notFound('Meals Not Found')
        }
        // transformed data
        const data = await transformed.mealsData(meals)
        // total member count
        const totalItems = await mealsServices.count({ search });
        // pagination make
        const pagination = getPagination(totalItems, page, limit)

        // Heteoas make
        const links = getHeteOASForAllItems({ url: req.url, path: req.path, query: req.query, hasNext: !!pagination.next_page, prev_page: !!pagination.hasPrev, page })
        // responses make

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

module.exports = find_all