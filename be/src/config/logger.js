import winston from "winston"

const enumerateErrorFormat = winston.format(info => {
	if (info instanceof Error) {
		info.message = `${info.message} ${info.stack}`
	}
	return info
})

const logger = winston.createLogger({
	level: process.env.NODE_ENV === "production" ? "info" : "debug",
	format: winston.format.combine(
		enumerateErrorFormat(),
		winston.format.colorize(),
		winston.format.timestamp({
			format: "YYYY-MM-DD HH:mm:ss",
		}),
		winston.format.splat(),
		winston.format.printf(
			info => ` ${info.level}: ${info.message} - ${info.timestamp}`,
		),
	),
	transports: [new winston.transports.Console()],
})

export default logger
