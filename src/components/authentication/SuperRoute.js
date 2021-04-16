import React, { useState, useEffect } from 'react'
import { Redirect, Route } from 'react-router-dom'
import PropTypes from 'prop-types'
import { isSuperuser } from '../api/authApi'

const SuperRoute = ({ component: Component, ...rest }) => {
	const [state, setState] = useState('loading')

	// eslint-disable-next-line
	useEffect(async function () {
		const superuser = await isSuperuser()
		setState(superuser)
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

SuperRoute.propTypes = {
	component: PropTypes.object.isRequired,
	location: PropTypes.object,
}

export default SuperRoute
