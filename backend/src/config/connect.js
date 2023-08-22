import mongoose from "mongoose";
import logger from "./logger.js";

export const connectDB = (url) => {
    mongoose.connection.on('error', (e) => {
        logger.error(`MongoDB connection error: ${e}`)
        process.exit(1)
    })

    if (process.env.NODE_ENV !== 'production') {
        mongoose.set('debug', true)
    }

    mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() => {
        logger.info('Connected to the database!')
    })
}