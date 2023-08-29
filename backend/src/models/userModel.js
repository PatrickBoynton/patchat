import mongoose from 'mongoose'
import validator from 'validator'
import logger from '../config/logger.js'
import bcrypt from 'bcrypt'

const userSchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, 'Please provide your name.'],
		},
		email: {
			type: String,
			required: [true, 'Please enter an email.'],
			unique: [true, 'This email already exists'],
			lowercase: true,
			validate: [validator.isEmail, 'Please provide a valid email.'],
		},
		image: {
			type: String,
			default: '',
		},
		status: {
			type: String,
			default: "Hey there I'm using patchat!",
		},
		password: {
			type: String,
			required: [true, 'Please input a password'],
			minLength: [6, 'Please enter 6 or more characters.'],
			maxLength: [
				128,
				'Please use a password less than 128 characters in length',
			],
		},
	},
	{
		collection: 'users',
		timestamps: true,
	},
)

// Don't use arrow functions here - to remind myself of past problems
userSchema.pre('save', async function (next) {
	try {
		if (this.isNew) {
			const salt = await bcrypt.genSalt(12)
			const hashedPassword = await bcrypt.hash(this.password, salt)
			this.password = hashedPassword
		}
		next()
	} catch (e) {
		next(e)
		// TODO remove when done building
		logger.error(e)
	}
})

const UserModel =
	mongoose.models.UserModel || mongoose.model('UserModel', userSchema)

export default UserModel
