


const getPagination = require('../../src/utilis/pagination');

describe('getPagination', () => {
    it('should return pagination information for a specific page and limit', () => {
        const total_items = 50;
        const page = 3;
        const limit = 15;

        const result = getPagination(total_items, page, limit);
        expect(result).toEqual({
            page: 3,
            limit: 15,
            total_items: 50,
            total_page: 4,
            prev_page: 2,
            next_page: 4,
        });
    });
    it('should handle the last page', () => {
        const total_items = 30;
        const page = 3;
        const limit = 10;

        const result = getPagination(total_items, page, limit);
        expect(result).toEqual({
            page: 3,
            limit: 10,
            total_items: 30,
            total_page: 3,
            prev_page: 2,
        });
    });
});
