import logger from "../config/logger.js"

export const register = (req, res) => {
	try {
		logger.info("This is the register route")
		res.send("Register")
	} catch (error) {
		logger.error(error)
	}
}

export const login = (req, res) => {
	try {
		logger.info("This is the login route")
		res.send("Login")
	} catch (error) {
		logger.error(error)
	}
}

export const logout = (req, res) => {
	try {
		logger.info("This is the logout route")
		res.send("Logout")
	} catch (error) {
		logger.error(error)
	}
}

export const refreshToken = (req, res) => {
	try {
		logger.info("This is the refresh token route")
		res.send("Refresh Token")
	} catch (error) {
		logger.error(error)
	}
}
