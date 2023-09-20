
const memberServices = require('../../../../lib/members/index')
const defaults = require('../../../../config/defaults')
const getPagination = require('../../../../utilis/pagination')
const { getHeteOASForAllItems } = require('../../../../utilis/Heteoas')
const transformed = require('../../../../utilis/generateResponse')
const { notFound } = require('../../../../utilis/error')
const findAll = async (req, res, next) => {

    const page = req.query.page || defaults.page;
    const limit = req.query.limit || defaults.limit;
    const sortType = req.query.sort_type || defaults.sortType;
    const sortBy = req.query.sort_by || defaults.sortBy;
    const search = req.query.search || defaults.search;

    try {

        const members = await memberServices.findAll({
            page,
            limit,
            sortType,
            sortBy,
            search
        })
        if (members.length === 0) {
            throw notFound('Member Not Exist')
        }

        // transformed data
        const data = await transformed.Data(members)
        // total member count
        const totalItems = await memberServices.count({ search });
        // pagination make
        const pagination = getPagination(totalItems, page, limit)

        // Heteoas make
        const links = getHeteOASForAllItems({ url: req.url, path: req.path, query: req.query, hasNext: !!pagination.next, hasPrev: !!pagination.hasPrev, page })
        // responses make  
        const response = {

            code: 200,
            message: "Members retrieved successfully",
            data: data,
            pagination: pagination,
            links: links

        }
        res.status(200).json(response);
    } catch (err) {
        next(err);
    }
};

module.exports = findAll