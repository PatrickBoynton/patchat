import mongoose from 'mongoose'
import validator from 'validator'

const userSchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, 'Please provide your name.']
		},
		email: {
			type: String,
			required: [true, 'Please enter an email.'],
			unique: [true, 'This email already exists'],
			lowercase: true,
			validate: [validator.isEmail, 'Please provide a valid email.']
		},
		image: {
			type: String,
			default: ''
		},
		status: {
			type: String,
			default: 'Hey there I\'m using patchat!'
		},
		password: {
			type: String,
			required: [true, 'Please input a password'],
			minLength: [6, 'Please enter 6 or more characters.'],
			maxLength: [
				128,
				'Please use a password less than 128 characters in length'
			]
		}
	},
	{
		collection: 'users',
		timestamps: true
	}
)

const UserModel =
	mongoose.models.UserModel || mongoose.model('UserModel', userSchema)

export default UserModel
