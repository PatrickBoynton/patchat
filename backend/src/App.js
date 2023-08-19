import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import helmet from 'helmet'
import mongoSanitize from 'express-mongo-sanitize'
import cookieParser from 'cookie-parser'
import compression from 'compression'
import fileUpload from 'express-fileupload'
import createHttpError from 'http-errors'

dotenv.config()

const app = express()

const PORT = process.env.PORT

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
	})
)

app.use('/', (req, res) => {
	res.json({ message: 'The API is running!' })
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
app.use(async (err, req, res, next) => {
	next(createHttpError.NotFound('This route exists not!'))
})

app.listen(PORT, () => console.log(`Go to http://localhost:${PORT}`))
