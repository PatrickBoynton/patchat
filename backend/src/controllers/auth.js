import { createUser } from '../services/auth.js'
import logger from '../config/logger.js'

export const register = async (req, res, next) => {
	try {
		const { name, email, image, status, password } = req.body
		const newUser = await createUser({
			name,
			email,
			image,
			status,
			password,
		})

		res.status(201).json(newUser)
	} catch (e) {
		logger.error(e)
		next(e)
	}
}

export const login = (req, res, next) => {
	try {
		res.send('Login works!')
	} catch (e) {
		next(e)
	}
}

export const logout = (req, res, next) => {
	try {
		res.send('Logout works!')
	} catch (e) {
		next(e)
	}
}

export const refreshToken = (req, res, next) => {
	try {
		res.send('Refresh works!')
	} catch (e) {
		next(e)
	}
}
