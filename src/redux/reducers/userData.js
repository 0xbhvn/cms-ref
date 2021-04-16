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
} from '../actions/types'

const initialState = {
	loading: false,
	user: null,
	error: '',
}

export default function userDataReducer(state = initialState, action) {
	switch (action.type) {
		case FETCH_USER_REQUEST:
		case UPDATE_USER_REQUEST:
		case DELETE_USER_REQUEST:
			return {
				...state,
				loading: true,
			}
		case FETCH_USER_SUCCESS:
		case UPDATE_USER_SUCCESS:
			return {
				...state,
				loading: false,
				user: action.payload,
				error: '',
			}
		case FETCH_USER_FAILURE:
		case UPDATE_USER_FAILURE:
		case DELETE_USER_FAILURE:
			return {
				...state,
				loading: false,
				user: null,
				error: action.payload,
			}
		case DELETE_USER_SUCCESS:
			return {
				...state,
				loading: false,
				user: null,
				error: '',
			}
		default:
			return state
	}
}
