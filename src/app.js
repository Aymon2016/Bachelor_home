const express = require('express');
const routes = require('./routes/index.js')
const { swagger_doc } = require('./middleware/index.js');
const morgan = require('morgan');
const cors = require('cors')

const app = express();

// yaml middleware

swagger_doc(app)
app.use([morgan('dev'), cors(), express.json()]);
app.use(routes)

app.get('/helth', (req, res) => {
    console.log('calling')

    res.status(200).json({ message: 'helth route is ok' })
})

app.use('*', (req, res, next) => {
    const error = new Error('Requested resource not found')
    error.code = 404
    error.error = 'Not Found'

    next(error)
})
app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        message: err.message,
        errors: err.errors,
    })
})

module.exports = app