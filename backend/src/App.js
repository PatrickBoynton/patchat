import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import helmet from 'helmet'
import mongoSanitize from 'express-mongo-sanitize'
import cookieParser from 'cookie-parser'
import compression from 'compression'
import fileUpload from 'express-fileupload'
import createHttpError from 'http-errors'
import routes from './routes/index.js'
import mongoose from "mongoose";
import logger from "./config/logger.js";

dotenv.config()

const app = express()

const {PORT, DATABASE_URL} = process.env


mongoose.connection.on('error', (e) => {
    logger.error(`MongoDB connection error: ${e}`)
    process.exit(1)
})

if (process.env.NODE_ENV === 'development') {
    mongoose.set('debug', true)
}

mongoose.connect(DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    logger.info('Connected to the database!')
})

app.use(express.json())

app.use(express.urlencoded({extended: true}))

if (process.env.NODE_ENV !== 'development') {
    app.use(morgan('dev'))
}

app.use(helmet())

app.use(mongoSanitize())

app.use(cookieParser())

app.use(compression())

app.use(
    fileUpload({
        useTempFiles: true,
    })
)

app.use('/api', routes)


app.use(async (req, res, next) => {
    next(createHttpError.NotFound('Route found is not.'))
})

app.use(async (err, req, res, next) => {
    res.status(err.status || 500)
    res.send({
        error: {
            status: err.status || 500,
            message: err.message
        }
    })
})

app.listen(PORT, () => logger.info(`Go to http://localhost:${PORT}`))
