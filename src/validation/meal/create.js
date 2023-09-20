
const validator = require('validator')

const validate = meal => {

    if (!meal.member_id) {
        error.member_id = 'Please Provide Your member_id'
    }

    if (!meal.date) {
        error.date = 'Please Provide a date'
    }
    if (!meal.type) {
        error.type = 'Please Provide Your type'
    }

    if (!meal.price) {
        error.price = 'Please Provide a price'
    }
    if (!meal.description) {
        error.description = 'Please Provide a description'
    }
    return {
        error,
        isValid: Object.keys(error).length === 0
    }
}

module.exports = validate