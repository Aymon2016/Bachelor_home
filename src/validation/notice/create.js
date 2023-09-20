


const validator = require('validator')

const validate = notice => {

    if (!notice.title) {
        error.title = 'Please Provide Your Title'
    }

    if (!notice.body) {
        error.body = 'Please Provide a body'
    }

    return {
        error,
        isValid: Object.keys(error).length === 0
    }
}

module.exports = validate