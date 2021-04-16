import React from 'react'
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Form, Formik } from 'formik'
import { Button, CssBaseline, Typography, Container } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { deleteUser } from '../../../redux/actions/userData'

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	avatar: {
		margin: theme.spacing(1),
		color: theme.palette.secondary.main,
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}))

const DeleteUser = (props) => {
	const classes = useStyles()
	const { user, deleteUser, history } = props
	const { username } = useParams()

	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<div className={classes.paper}>
				<Formik
					onSubmit={async (data, { setSubmitting }) => {
						setSubmitting(true)
						await deleteUser(username)
						history.push('/dashboard/users')
						window.location.reload()
						setSubmitting(false)
					}}
				>
					{({ isSubmitting }) => (
						<Form className={classes.form}>
							<Button
								type="submit"
								fullWidth
								variant="contained"
								color="primary"
								disabled={isSubmitting}
								className={classes.submit}
							>
								Confirm Delete
							</Button>
							<Typography color="secondary" align="center">
								{user.error}
							</Typography>
						</Form>
					)}
				</Formik>
			</div>
		</Container>
	)
}

DeleteUser.propTypes = {
	deleteUser: PropTypes.func.isRequired,
	history: PropTypes.object.isRequired,
}

function mapStateToProps(state) {
	return {
		user: state.userData,
	}
}

const mapDispatchToProps = {
	deleteUser: (username) => deleteUser(username),
}

export default connect(mapStateToProps, mapDispatchToProps)(DeleteUser)
