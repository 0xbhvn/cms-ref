import {
	FETCH_ARTICLES_REQUEST,
	FETCH_ARTICLES_SUCCESS,
	FETCH_ARTICLES_FAILURE,
} from '../actions/types'

const initialState = {
	loading: false,
	articles: [],
	error: '',
}

export default function articlesListReducer(state = initialState, action) {
	switch (action.type) {
		case FETCH_ARTICLES_REQUEST:
			return {
				...state,
				loading: true,
				articles: [],
				error: '',
			}
		case FETCH_ARTICLES_SUCCESS:
			return {
				...state,
				loading: false,
				articles: action.payload,
				error: '',
			}
		case FETCH_ARTICLES_FAILURE:
			return {
				...state,
				loading: false,
				articles: [],
				error: action.payload,
			}
		default:
			return state
	}
}
