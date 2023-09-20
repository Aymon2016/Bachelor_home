

const accountsServices = require('../../../../lib/transections/index')
const defaults = require('../../../../config/defaults')
const getPagination = require('../../../../utilis/pagination')
const { getHeteOASForAllItems } = require('../../../../utilis/Heteoas')
const transformed = require('../../../../utilis/generateResponse')
const { notFound } = require('../../../../utilis/error')

const findAllOfMember = async (req, res, next) => {

    const page = req.query.page || defaults.page;
    const limit = req.query.limit || defaults.limit;
    const sortType = req.query.sort_type || defaults.sortType;
    const sortBy = req.query.sort_by || defaults.sortBy;

    const { member_id } = req.params


    try {

        const transections = await accountsServices.findAllOfMember(member_id, {
            page,
            limit,
            sortType,
            sortBy,
        })

        if (transections.length === 0) {
            throw notFound('Transections Not Found')
        }

        // total transection count
        const totalItems = await accountsServices.count();
        // pagination make
        const pagination = getPagination(totalItems, page, limit)

        // Heteoas make
        const links = getHeteOASForAllItems({ url: req.url, path: req.path, query: req.query, hasNext: !!pagination.next_page, prev_page: !!pagination.hasPrev, page })
        // responses make


        // resposnse e transection id er jaigai _id response kortesi /ai ta change kora lagbe
        const response = {
            code: 200,
            message: 'All transection of member retrived sucessfull',
            data: transections,
            pagination,
            links,
        };

        res.status(200).json(response);
    } catch (err) {
        next(err);
    }
};

module.exports = findAllOfMember