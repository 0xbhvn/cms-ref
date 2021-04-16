import React from 'react'
import PropTypes from 'prop-types'
import { Typography, Link } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
	stackLink: {
		color: theme.palette.primary.main,
	},
}))

export default function Copyright() {
	const classes = useStyles()

	return (
		<Typography variant="body2" color="textSecondary" align="center">
			{'© '}
			<Link color="inherit" href="https://www.twitter.com/thisisbhaven">
				Bhaven's Blog
			</Link>{' '}
			{new Date().getFullYear()}
			{', Powered by '}
			<Link
				className={classes.stackLink}
				href="https://www.djangoproject.com"
			>
				Django
			</Link>
			{' \u2022 '}
			<Link className={classes.stackLink} href="https://reactjs.org">
				React
			</Link>
			{' \u2022 '}
			<Link className={classes.stackLink} href="https://www.heroku.com">
				Heroku
			</Link>
		</Typography>
	)
}

Copyright.propTypes = {
	title: PropTypes.string,
}
