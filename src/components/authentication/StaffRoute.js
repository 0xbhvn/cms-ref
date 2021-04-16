import React, { useState, useEffect } from 'react'
import { Redirect, Route } from 'react-router-dom'
import PropTypes from 'prop-types'
import { isStaff } from '../api/authApi'

const StaffRoute = ({ component: Component, ...rest }) => {
	const [state, setState] = useState('loading')

	// eslint-disable-next-line
	useEffect(async function () {
		const staff = await isStaff()
		setState(staff)
		// eslint-disable-next-line
	}, [])

	return (
		<Route
			{...rest}
			render={(props) =>
				state ? (
					<Component {...props} />
				) : (
					<Redirect
						to={{ pathname: '/', state: { from: props.location } }}
					/>
				)
			}
		/>
	)
}

StaffRoute.propTypes = {
	component: PropTypes.object.isRequired,
	location: PropTypes.object,
}

export default StaffRoute
