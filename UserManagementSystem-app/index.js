const express = require('express')
const port = 1000;
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const cors = require('cors');
const routeCall = require('./routeCall');

//middlewares
app.use(cookieParser())
app.use(cors())

//parsing body data middleware
app.use(bodyParser.urlencoded({
    extended: true,
}))
app.use(express.json());

//route logger middleware
app.use((req, res, next) => {
    console.log(`http://localhost:${port}${req.url}`)
    next();
})

//mongoose connection
mongoose.connect('mongodb://localhost:27017/registerDB',)
    .then(() => console.log("mongoose connected"))
    .catch((err) => console.log(err))
mongoose.connection.on('connected', () => {
    console.log("mongoose connected to db")
})
mongoose.connection.on('disconnected', () => {
    console.log("mongoose disconnected")
})
process.on('SIGINT', async () => {
    await mongoose.connection.close()
    process.exit(0)
})

//routes calls middleware
app.use(routeCall)

//error handling middleware
app.use(async (req, res, next) => {
    const error = new Error('Not found')
    error.status = 404
    next(error)
    // next(createError.NotFound())
})
app.use((err, req, res, next) => {
    res.status(err.status || 00)
    console.log(err)
    res.send({
        error: {
            status: err.status || 00,
            message: err.message
        }
    })
})

//listening connection to server
app.listen(port, () => console.log(`http://localhost:${port}`))
