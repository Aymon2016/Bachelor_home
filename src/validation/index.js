const singup = require('./auth/signup')
const singIn = require('./auth/signIn')
const createMeal = require('./meal/create')
const createNotice = require('./notice/create')
const createProduct = require('./product/create')
module.exports = {
    singup,
    singIn,
    createMeal,
    createNotice,
    createProduct
}