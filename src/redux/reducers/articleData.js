import {
	FETCH_ARTICLE_REQUEST,
	FETCH_ARTICLE_SUCCESS,
	FETCH_ARTICLE_FAILURE,
	CREATE_ARTICLE_REQUEST,
	CREATE_ARTICLE_SUCCESS,
	CREATE_ARTICLE_FAILURE,
	UPDATE_ARTICLE_REQUEST,
	UPDATE_ARTICLE_SUCCESS,
	UPDATE_ARTICLE_FAILURE,
	DELETE_ARTICLE_REQUEST,
	DELETE_ARTICLE_SUCCESS,
	DELETE_ARTICLE_FAILURE,
} from '../actions/types'

const initialState = {
	loading: false,
	article: null,
	error: '',
}

export default function articleDataReducer(state = initialState, action) {
	switch (action.type) {
		case FETCH_ARTICLE_REQUEST:
		case CREATE_ARTICLE_REQUEST:
		case UPDATE_ARTICLE_REQUEST:
		case DELETE_ARTICLE_REQUEST:
			return {
				...state,
				loading: true,
			}
		case FETCH_ARTICLE_SUCCESS:
		case CREATE_ARTICLE_SUCCESS:
		case UPDATE_ARTICLE_SUCCESS:
			return {
				...state,
				loading: false,
				article: action.payload,
				error: '',
			}
		case FETCH_ARTICLE_FAILURE:
		case CREATE_ARTICLE_FAILURE:
		case UPDATE_ARTICLE_FAILURE:
		case DELETE_ARTICLE_FAILURE:
			return {
				...state,
				loading: false,
				article: null,
				error: action.payload,
			}
		case DELETE_ARTICLE_SUCCESS:
			return {
				...state,
				loading: false,
				article: null,
				error: '',
			}
		default:
			return state
	}
}
