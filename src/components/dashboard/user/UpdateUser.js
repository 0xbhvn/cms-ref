import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Field, Form, Formik, useField } from 'formik'
import * as Yup from 'yup'
import {
	Button,
	CssBaseline,
	TextField,
	Typography,
	Container,
	CircularProgress,
} from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit'
import { makeStyles } from '@material-ui/core/styles'
import { fetchUser, updateUser } from '../../../redux/actions/userData'

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

const InputTextField = ({ placeholder, multiline, type, ...props }) => {
	const [field, meta] = useField(props)
	const errors = meta.error && meta.touched ? meta.error : ''

	return (
		<TextField
			{...field}
			variant="outlined"
			margin="normal"
			fullWidth
			placeholder={placeholder}
			helperText={errors}
			error={!!errors}
		/>
	)
}

const validationSchema = Yup.object().shape({
	email: Yup.string()
		.email('Please enter a valid email')
		.required('Email is required'),
	username: Yup.string()
		.required('Username is required')
		.min(6, 'Username should be at least 6 characters long')
		.max(16, 'Username should not exceed 16 characters'),
})

const UpdateUser = (props) => {
	const classes = useStyles()
	const { user, fetchUser, updateUser, history } = props
	const { username } = useParams()
	const justInCaseUsername = username

	// eslint-disable-next-line
	useEffect(async () => {
		fetchUser(username)
		// eslint-disable-next-line
	}, [])

	return user.user === null ? (
		<div>
			<CircularProgress />
		</div>
	) : (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<div className={classes.paper}>
				<EditIcon className={classes.avatar} />
				<Typography component="h1" variant="h5">
					Update User
				</Typography>
				<Formik
					validateOnChange={true}
					initialValues={{
						email: user.user.email,
						username: user.user.username,
						is_staff: user.user.is_staff,
						is_superuser: user.user.is_superuser,
					}}
					validationSchema={validationSchema}
					onSubmit={async (data, { setSubmitting }) => {
						setSubmitting(true)
						const { email, username, is_staff, is_superuser } = data
						let formData = new FormData()
						formData.append('email', email)
						formData.append('username', username)
						formData.append('is_staff', is_staff)
						formData.append('is_superuser', is_superuser)
						await updateUser(justInCaseUsername, formData)
						history.push('/dashboard/users')
						setSubmitting(false)
					}}
				>
					{({ values, errors, handleChange, isSubmitting }) => (
						<Form className={classes.form}>
							<InputTextField
								name="email"
								id="email"
								placeholder="Email Address"
								label="Email Address"
							/>
							<InputTextField
								name="username"
								id="username"
								placeholder="Username"
								label="Username"
							/>
							<label>
								IsStaff?
								<Field
									type="checkbox"
									name="is_staff"
									id="is_satff"
								/>
							</label>
							<label>
								IsSuperuser?
								<Field
									type="checkbox"
									name="is_superuser"
									id="is_superuser"
								/>
							</label>
							<Button
								type="submit"
								fullWidth
								variant="contained"
								color="primary"
								disabled={isSubmitting}
								className={classes.submit}
							>
								Submit
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

UpdateUser.propTypes = {
	fetchUser: PropTypes.func.isRequired,
	updateUser: PropTypes.func.isRequired,
	history: PropTypes.object.isRequired,
}

function mapStateToProps(state) {
	return {
		user: state.userData,
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		fetchUser: (username) => dispatch(fetchUser(username)),
		updateUser: (username, formData) =>
			dispatch(updateUser(username, formData)),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateUser)
