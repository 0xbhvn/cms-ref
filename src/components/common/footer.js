import React from 'react'
import PropTypes from 'prop-types'
import { Container, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Copyright from './copyright'

const useStyles = makeStyles((theme) => ({
	footer: {
		backgroundColor: theme.palette.background.paper,
		marginTop: theme.spacing(8),
		padding: theme.spacing(6, 0),
	},
	title: {
		flex: 1,
		fontFamily: '"Dela Gothic One", cursive',
	},
}))

export default function Footer(props) {
	const classes = useStyles()

	return (
		<footer className={classes.footer}>
			<Container maxWidth="lg">
				<Typography
					className={classes.title}
					variant="body1"
					align="center"
					gutterBottom
				>
					Bhaven's Blog
				</Typography>
				<Copyright />
			</Container>
		</footer>
	)
}

Footer.propTypes = {
	title: PropTypes.string,
}
