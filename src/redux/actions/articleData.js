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
} from './types'
import axiosAPI from '../../components/api/axiosApi'

export function fetchArticleRequest() {
	return {
		type: FETCH_ARTICLE_REQUEST,
	}
}

export function fetchArticleSuccess(article) {
	return {
		type: FETCH_ARTICLE_SUCCESS,
		payload: article,
	}
}

export function fetchArticleFailure(error) {
	return {
		type: FETCH_ARTICLE_FAILURE,
		payload: error,
	}
}

export function fetchArticle(slug) {
	return async function (dispatch) {
		dispatch(fetchArticleRequest())
		try {
			const response = await axiosAPI.get(`articles/${slug}/`)
			dispatch(fetchArticleSuccess(response.data))
		} catch (error) {
			dispatch(fetchArticleFailure(error.message))
		}
	}
}

export function createArticleRequest() {
	return {
		type: CREATE_ARTICLE_REQUEST,
	}
}

export function createArticleSuccess(article) {
	return {
		type: CREATE_ARTICLE_SUCCESS,
		payload: article,
	}
}

export function createArticleFailure(error) {
	return {
		type: CREATE_ARTICLE_FAILURE,
		payload: error,
	}
}

export function createArticle(data) {
	return async function (dispatch) {
		dispatch(createArticleRequest())
		try {
			const response = await axiosAPI.post(`articles/create/`, data)
			console.log(data)
			dispatch(createArticleSuccess(response.data))
		} catch (error) {
			dispatch(createArticleFailure(error.message))
		}
	}
}

export function updateArticleRequest() {
	return {
		type: UPDATE_ARTICLE_REQUEST,
	}
}

export function updateArticleSuccess(article) {
	return {
		type: UPDATE_ARTICLE_SUCCESS,
		payload: article,
	}
}

export function updateArticleFailure(error) {
	return {
		type: UPDATE_ARTICLE_FAILURE,
		payload: error,
	}
}

export function updateArticle(slug, data) {
	return async function (dispatch) {
		dispatch(updateArticleRequest())
		try {
			const response = await axiosAPI.put(
				`articles/update/${slug}/`,
				data
			)
			dispatch(updateArticleSuccess(response.data))
		} catch (error) {
			dispatch(updateArticleFailure(error.message))
		}
	}
}

export function deleteArticleRequest() {
	return {
		type: DELETE_ARTICLE_REQUEST,
	}
}

export function deleteArticleSuccess() {
	return {
		type: DELETE_ARTICLE_SUCCESS,
	}
}

export function deleteArticleFailure(error) {
	return {
		type: DELETE_ARTICLE_FAILURE,
		payload: error,
	}
}

export function deleteArticle(slug) {
	return async function (dispatch) {
		dispatch(deleteArticleRequest())
		try {
			await axiosAPI.delete(`articles/update/${slug}/`)
			dispatch(deleteArticleSuccess())
		} catch (error) {
			dispatch(deleteArticleFailure(error.message))
		}
	}
}
