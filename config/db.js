const mongoose = require('mongoose')
require("dotenv").config()

const MONGODB_CONNECT = process.env.MONGODB_CONNECT

function connectToDb() {
    mongoose.connect(MONGODB_CONNECT)

    mongoose.connection.on('connected', () => console.log('Connected to MongoDB successfully'))
    mongoose.connection.on('error', (error) => console.log(`An error occurred: ${error}`))
}

module.exports = connectToDb