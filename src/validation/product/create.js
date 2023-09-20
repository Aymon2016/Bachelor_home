


const validator = require('validator')

const validate = product => {

    if (!product.name) {
        error.name = 'Please Provide Your Titlnamee'
    }

    if (!product.price) {
        error.price = 'Please Provide a price'
    }
    if (!product.description) {
        error.description = 'Please Provide a description'
    }


    return {
        error,
        isValid: Object.keys(error).length === 0
    }
}

module.exports = validate