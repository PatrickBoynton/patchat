import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import helmet from 'helmet'
import mongoSanitize from 'express-mongo-sanitize'
import cookieParser from 'cookie-parser'
import compression from 'compression'
import fileUpload from 'express-fileupload'

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

app.get('/', (req, res) => {
	res.send('The API is running!')
})

app.listen(PORT, () => console.log(`Go to http://localhost:${PORT}`))
