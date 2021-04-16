import axiosAPI, { setNewHeaders } from './axiosApi'

export async function signUp(email, username, password, cpassword) {
	const response = await axiosAPI.post(`accounts/register/`, {
		email,
		username,
		password,
		cpassword,
	})
	localStorage.setItem('user', response.data)
	return response
}

export async function obtainToken(email, password) {
	const response = await axiosAPI.post(`token/`, {
		email,
		password,
	})
	setNewHeaders(response)
	return response
}

export async function refreshToken(refresh) {
	const response = await axiosAPI.post(`token/refresh/`, {
		refresh,
	})
	setNewHeaders(response)
	return response
}

export async function logout() {
	localStorage.removeItem('access_token')
	localStorage.removeItem('refresh_token')
}

export const isAuthenticated = () => {
	const token = localStorage.getItem('access_token')
	return !!token
}

export async function isStaff() {
	if (isAuthenticated()) {
		const response = await axiosAPI.get(`accounts/current_user/`)
		return !!response.data.is_staff
	} else {
		return false
	}
}

export async function isSuperuser() {
	if (isAuthenticated()) {
		const response = await axiosAPI.get(`accounts/current_user/`)
		return !!response.data.is_superuser
	} else {
		return false
	}
}
