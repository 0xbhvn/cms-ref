import {
	FETCH_USER_REQUEST,
	FETCH_USER_SUCCESS,
	FETCH_USER_FAILURE,
	UPDATE_USER_REQUEST,
	UPDATE_USER_SUCCESS,
	UPDATE_USER_FAILURE,
	DELETE_USER_REQUEST,
	DELETE_USER_SUCCESS,
	DELETE_USER_FAILURE,
} from './types'
import axiosAPI from '../../components/api/axiosApi'

export function fetchUserRequest() {
	return {
		type: FETCH_USER_REQUEST,
	}
}

export function fetchUserSuccess(user) {
	return {
		type: FETCH_USER_SUCCESS,
		payload: user,
	}
}

export function fetchUserFailure(error) {
	return {
		type: FETCH_USER_FAILURE,
		payload: error,
	}
}

export function fetchUser(slug) {
	return async function (dispatch) {
		dispatch(fetchUserRequest())
		try {
			const response = await axiosAPI.get(`accounts/${slug}/`)
			dispatch(fetchUserSuccess(response.data))
		} catch (error) {
			dispatch(fetchUserFailure(error.message))
		}
	}
}

export function updateUserRequest() {
	return {
		type: UPDATE_USER_REQUEST,
	}
}

export function updateUserSuccess(user) {
	return {
		type: UPDATE_USER_SUCCESS,
		payload: user,
	}
}

export function updateUserFailure(error) {
	return {
		type: UPDATE_USER_FAILURE,
		payload: error,
	}
}

export function updateUser(slug, data) {
	return async function (dispatch) {
		dispatch(updateUserRequest())
		try {
			const response = await axiosAPI.put(`accounts/${slug}/`, data)
			dispatch(updateUserSuccess(response.data))
		} catch (error) {
			dispatch(updateUserFailure(error.message))
		}
	}
}

export function deleteUserRequest() {
	return {
		type: DELETE_USER_REQUEST,
	}
}

export function deleteUserSuccess() {
	return {
		type: DELETE_USER_SUCCESS,
	}
}

export function deleteUserFailure(error) {
	return {
		type: DELETE_USER_FAILURE,
		payload: error,
	}
}

export function deleteUser(slug) {
	return async function (dispatch) {
		dispatch(deleteUserRequest())
		try {
			await axiosAPI.delete(`accounts/${slug}/`)
			dispatch(deleteUserSuccess())
		} catch (error) {
			dispatch(deleteUserFailure(error.message))
		}
	}
}
