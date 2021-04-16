import {
	LOAD_USER_REQUEST,
	LOAD_USER_SUCCESS,
	LOAD_USER_FAILURE,
	LOGIN_USER_REQUEST,
	LOGIN_USER_SUCCESS,
	LOGIN_USER_FAILURE,
	SIGNUP_USER_REQUEST,
	SIGNUP_USER_SUCCESS,
	SIGNUP_USER_FAILURE,
	LOGOUT_USER,
} from '../actions/types'

const initialState = {
	token: localStorage.getItem('access_token'),
	loading: false,
	user: null,
	error: '',
}

export default function authReducer(state = initialState, action) {
	switch (action.type) {
		case LOAD_USER_REQUEST:
		case LOGIN_USER_REQUEST:
		case SIGNUP_USER_REQUEST:
			return {
				...state,
				loading: true,
			}
		case LOAD_USER_SUCCESS:
		case LOGIN_USER_SUCCESS:
		case SIGNUP_USER_SUCCESS:
			return {
				...state,
				token: localStorage.getItem('access_token'),
				loading: false,
				user: action.payload.user,
				error: '',
			}
		case LOAD_USER_FAILURE:
		case LOGIN_USER_FAILURE:
		case SIGNUP_USER_FAILURE:
			localStorage.removeItem('access_token')
			localStorage.removeItem('refresh_token')
			return {
				...state,
				token: null,
				loading: false,
				user: null,
				error: action.payload,
			}
		case LOGOUT_USER:
			return {
				...state,
				token: null,
				loading: false,
				user: null,
				error: '',
			}
		default:
			return state
	}
}
