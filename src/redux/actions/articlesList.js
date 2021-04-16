import {
	FETCH_ARTICLES_REQUEST,
	FETCH_ARTICLES_SUCCESS,
	FETCH_ARTICLES_FAILURE,
} from './types'
import axiosAPI from '../../components/api/axiosApi'

export function fetchArticlesRequest() {
	return {
		type: FETCH_ARTICLES_REQUEST,
	}
}

export function fetchArticlesSuccess(articles) {
	return {
		type: FETCH_ARTICLES_SUCCESS,
		payload: articles,
	}
}

export function fetchArticlesFailure(error) {
	return {
		type: FETCH_ARTICLES_FAILURE,
		payload: error,
	}
}

export function fetchArticles() {
	return async function (dispatch) {
		dispatch(fetchArticlesRequest())
		try {
			const response = await axiosAPI.get(`articles/`)
			dispatch(fetchArticlesSuccess(response.data))
		} catch (error) {
			dispatch(fetchArticlesFailure(error.message))
		}
	}
}
