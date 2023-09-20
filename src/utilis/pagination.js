
const defaults = require('../config/defaults')

const getPagination = (
    total_items = defaults.totalItems,
    page = defaults.page,
    limit = defaults.limit
) => {

    const total_page = Math.ceil(total_items / limit);

    const pagination = {
        page,
        limit,
        total_items,
        total_page,
    };

    if (page < total_page) {
        pagination.next_page = page + 1;
    }

    if (page > 1) {
        pagination.prev_page = page - 1;
    }

    return pagination;
}
module.exports = getPagination