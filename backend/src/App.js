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
import logger from './config/logger.js'
import { connectDB } from './config/connect.js'

dotenv.config()

const app = express()

const { PORT, DATABASE_URL } = process.env

connectDB(DATABASE_URL)

app.use(express.json())

app.use(express.urlencoded({ extended: true }))

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
	}),
)

app.get('/', (req, res) => {
	res.send('API IS RUNNING!')
})

// http://localhost:8000/api
app.use('/api', routes)

app.use(async (req, res, next) => {
	next(createHttpError.NotFound('Route found is not.'))
})

app.use(async (err, req, res, next) => {
	res.status(err.status || 500)
	res.send({
		error: {
			status: err.status || 500,
			message: err.message,
		},
	})
})

const server = app.listen(PORT, () => {
	logger.info(`Go to http://localhost:${PORT}`)
	const pid = process.pid
	logger.info(`PID: ${pid}`)
})

const exitHandler = () => {
	if (server) {
		logger.info('Server closed')
		process.exit(1)
	} else {
		process.exit(1)
	}
}

const unexpectedErrorHandler = error => {
	logger.error(error)
	exitHandler()
}

process.on('uncaughtException', unexpectedErrorHandler)
process.on('unhandledRejection', unexpectedErrorHandler)
process.on('SIGTERM', () => {
	if (server) {
		logger.info('Server is closed.')
		process.exit(1)
	}
})
