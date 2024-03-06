import app from "./app.js"
import logger from "./config/logger.js"
import mongoose from "mongoose"

const PORT = process.env.PORT

mongoose.connection.on("error", error => {
	logger.error(`MongoDB connection error: ${error}`)
	process.exit(1)
})

if (process.env.NODE_ENV === "development") {
	mongoose.set("debug", true)
}

mongoose.connect(process.env.DATABASE_URL).then(() => {
	logger.info("Connected to MongoDB")
})

let server = app.listen(PORT, () => {
	logger.info(`Server is running on port ${PORT}`)
	logger.info(`pid: ${process.pid}`)
})

const exitHandler = () => {
	if (server) {
		logger.info("Server closed.")
		process.exit(1)
	} else {
		logger.info("Server is not running.")
		process.exit(1)
	}
}

const unexpectedErrorHandler = error => {
	logger.error(error)
	exitHandler()
}

process.on("uncaughtException", unexpectedErrorHandler)
process.on("unhandledRejection", unexpectedErrorHandler)

process.on("SIGTERM", () => {
	logger.info("SIGTERM received")
	if (server) {
		process.exit(1)
	}
})
