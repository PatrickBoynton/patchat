import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	status: '',
	error: '',
	user: {
		_id: '',
		name: '',
		email: '',
		picture: '',
		status: '',
		token: '',
	},
}
export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		logout: {
			status: '',
			error: '',
			user: {
				_id: '',
				name: '',
				email: '',
				picture: '',
				status: '',
				token: '',
			},
		},
	},
})

export const { logout } = userSlice.actions
export default userSlice.reducer
