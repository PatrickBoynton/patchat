import createHttpError from 'http-errors'
import validator from 'validator'
import { UserModel } from '../models/index.js'

export const createUser = async userData => {
	const { name, email, image, status, password } = userData
	console.log('userData: ', userData)
	if (!name || !email || !password)
		throw new createHttpError.BadRequest('Please fill out all fields. ')

	if (!validator.isLength(name, { min: 2, max: 16 })) {
		throw new createHttpError.BadRequest(
			'Please make sure your name is between 2 and 16 characters long.',
		)
	}

	if (!validator.isEmail(email)) {
		throw new createHttpError.BadRequest('Please provide a valid email.')
	}

	const userExists = await UserModel.findOne({ email })

	if (userExists) {
		throw new createHttpError.Conflict(
			'Please try again with a different email address.',
		)
	}

	if (!validator.isLength(password, { min: 6, max: 128 })) {
		throw new createHttpError.BadRequest(
			'Please make sure your password is between 6 and 128 characters.',
		)
	}

	const user = await new UserModel({
		name,
		email,
		image,
		password,
	}).save()

	return user
}
