import express from "express"
import dotenv from "dotenv"
import morgan from "morgan"
import cors from "cors"
import helmet from "helmet"
import mongoSanitize from "express-mongo-sanitize"
import cookieParser from "cookie-parser"
import compression from "compression"
import fileUpload from "express-fileupload"
import createHttpError from "http-errors"
import routes from "./routes/index.js"

dotenv.config()

const app = express()

app.use(express.json())

app.use(express.urlencoded({ extended: true }))

if (process.env.NODE_ENV === "development") {
	app.use(morgan("dev"))
}

app.use(cors())

app.use(helmet())

app.use(mongoSanitize())

app.use(cookieParser())

app.use(compression())

app.use(fileUpload({ useTempFiles: true }))

// Path: http://localhost:3001/api/
app.use("/api", routes)

app.get("/", (req, res) => {
	res.send("Hello World")
})

app.use((req, res, next) => {
	next(createHttpError.NotFound("This route does not exist"))
})

app.use(async (err, req, res, next) => {
	res.status(err.status || 500).send({
		error: {
			status: err.status || 500,
			message: err.message,
		},
	})
})

export default app
