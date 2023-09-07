const mongoose = require('mongoose')
require('dotenv').config();

let connectionUrl = process.env.DB_CONNECTION_URL;

connectionUrl = connectionUrl.replace('<username>', process.env.DB_USERNAME)
connectionUrl = connectionUrl.replace('<password>', process.env.DB_PASSWORD)
connectionUrl = `${connectionUrl}/${process.env.DB_NAME}?${process.env.DB_QUERY}`





const connectDB = async () => {

    await mongoose.connect(connectionUrl, { dbName: process.env.DB_NAME })
    console.log('Database connected')

}

module.exports = connectDB