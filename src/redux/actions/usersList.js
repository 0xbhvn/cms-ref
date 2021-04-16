import {
	FETCH_USERS_REQUEST,
	FETCH_USERS_SUCCESS,
	FETCH_USERS_FAILURE,
} from './types'
import axiosAPI from '../../components/api/axiosApi'

export function fetchUsersRequest() {
	return {
		type: FETCH_USERS_REQUEST,
	}
}

export function fetchUsersSuccess(users) {
	return {
		type: FETCH_USERS_SUCCESS,
		payload: users,
	}
}

export function fetchUsersFailure(error) {
	return {
		type: FETCH_USERS_FAILURE,
		payload: error,
	}
}

export function fetchUsers() {
	return async function (dispatch) {
		dispatch(fetchUsersRequest())
		try {
			const response = await axiosAPI.get(`accounts/`)
			dispatch(fetchUsersSuccess(response.data))
		} catch (error) {
			dispatch(fetchUsersFailure(error.message))
		}
	}
}
