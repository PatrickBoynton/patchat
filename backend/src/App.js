import express from 'express'
import dotenv from 'dotenv'

dotenv.config()

const app = express()

const PORT = process.env.PORT

app.get('/', (req, res) => {
	res.send('The API is running!')
})

app.listen(PORT, () => console.log(`Go to http://localhost:${PORT}`))
