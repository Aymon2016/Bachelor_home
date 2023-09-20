
const productsServices = require('../../../../lib/products/index')
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

        const products = await productsServices.findAll({
            page,
            limit,
            sortType,
            sortBy,
            search
        })

        if (products.length === 0) {
            throw notFound('Product Not Found')
        }
        // transformed data
        const data = await transformed.productsData(products)
        // total member count
        const totalItems = await productsServices.count({ search });
        // pagination make
        const pagination = getPagination(totalItems, page, limit)

        // Heteoas make
        const links = getHeteOASForAllItems({ url: req.url, path: req.path, query: req.query, hasNext: !!pagination.next_page, hasPrev: !!pagination.prev_page, page })
        // responses make  

        const response = {
            code: 200,
            message: 'Products retrieved successfully',
            data: data,
            pagination: pagination,
            links: links,
        };

        res.status(200).json(response);
    } catch (err) {
        next(err);
    }
};

module.exports = findAll