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
} from './types'
import { obtainToken, logout, signUp } from '../../components/api/authApi'
import axiosAPI from '../../components/api/axiosApi'

export function loadUserRequest() {
	return {
		type: LOAD_USER_REQUEST,
	}
}

export function loadUserSuccess(user) {
	return {
		type: LOAD_USER_SUCCESS,
		payload: { user },
	}
}

export function loadUserFailure(error) {
	return {
		type: LOAD_USER_FAILURE,
		payload: error,
	}
}

export function loadUser() {
	return async function (dispatch) {
		dispatch(loadUserRequest())
		try {
			const response = await axiosAPI.get(`accounts/current_user/`)
			dispatch(loadUserSuccess(response.data))
		} catch (error) {
			dispatch(loadUserFailure(error.message))
		}
	}
}

export function loginUserRequest() {
	return {
		type: LOGIN_USER_REQUEST,
	}
}

export function loginUserSuccess(token) {
	return {
		type: LOGIN_USER_SUCCESS,
		payload: { token },
	}
}

export function loginUserFailure(error) {
	return {
		type: LOGIN_USER_FAILURE,
		payload: error,
	}
}

export function loginUser(email, password) {
	return async function (dispatch) {
		dispatch(loginUserRequest())
		try {
			const response = await obtainToken(email, password)
			dispatch(loginUserSuccess(response.data.access))
			dispatch(loadUser(response.data.access))
		} catch (error) {
			dispatch(loginUserFailure(error.message))
		}
	}
}

export function signUpUserRequest() {
	return {
		type: SIGNUP_USER_REQUEST,
	}
}

export function signUpUserSuccess() {
	return {
		type: SIGNUP_USER_SUCCESS,
	}
}

export function signUpUserFailure(error) {
	return {
		type: SIGNUP_USER_FAILURE,
		payload: error,
	}
}

export function signUpUser(email, username, password, cpassword) {
	return async function (dispatch) {
		dispatch(signUpUserRequest())
		try {
			await signUp(email, username, password, cpassword)
			dispatch(signUpUserSuccess())
		} catch (error) {
			dispatch(signUpUserFailure(error.message))
		}
	}
}

export function logoutUserSuccess() {
	return { type: LOGOUT_USER }
}

export function logoutUser() {
	return async function (dispatch) {
		await logout()
		dispatch(logoutUserSuccess())
	}
}
