import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Form, Formik, useField } from 'formik'
import * as Yup from 'yup'
import {
	Avatar,
	Button,
	CssBaseline,
	TextField,
	Link,
	Grid,
	Typography,
	Container,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { signUpUser } from '../../redux/actions/auth'

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}))

const InputTextField = ({ placeholder, type, ...props }) => {
	const [field, meta] = useField(props)
	const errors = meta.error && meta.touched ? meta.error : ''

	return (
		<TextField
			{...field}
			variant="outlined"
			margin="normal"
			fullWidth
			placeholder={placeholder}
			type={type}
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
	password: Yup.string()
		.required('Password is required')
		.min(8, 'Password should be at least 8 characters long')
		.max(32, 'Username should not exceed 32 characters')
		.matches(/(?=.*[0-9])/, 'Password must contain a number'),
	cpassword: Yup.string()
		.required('Confirm password is required')
		.oneOf([Yup.ref('password'), null], 'Passwords must match'),
})

const SignUpPage = (props) => {
	const classes = useStyles()
	const { auth, signUpUser, history } = props
	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<div className={classes.paper}>
				<Avatar className={classes.avatar} />
				<Typography component="h1" variant="h5">
					Sign Up
				</Typography>
				<Formik
					validateOnChange={true}
					initialValues={{
						email: '',
						username: '',
						password: '',
						cpassword: '',
					}}
					validationSchema={validationSchema}
					onSubmit={async (data, { setSubmitting }) => {
						setSubmitting(true)
						const { email, username, password, cpassword } = data
						await signUpUser(email, username, password, cpassword)
						history.push('/')
						setSubmitting(false)
					}}
				>
					{({ values, errors, isSubmitting }) => (
						<Form className={classes.form}>
							<InputTextField
								name="email"
								id="email"
								placeholder="Email Address"
								label="Email Address"
								autoFocus
							/>
							<InputTextField
								name="username"
								id="username"
								placeholder="Username"
								label="Username"
							/>
							<InputTextField
								name="password"
								id="password"
								placeholder="Password"
								type="password"
								label="Password"
							/>
							<InputTextField
								name="cpassword"
								id="cpassword"
								placeholder="Confirm Password"
								type="password"
								label="Confirm Password"
							/>
							<Button
								type="submit"
								fullWidth
								variant="contained"
								color="primary"
								disabled={isSubmitting}
								className={classes.submit}
							>
								Sign Up
							</Button>
							<Typography color="secondary" align="center">
								{auth.error}
							</Typography>
							<Grid container>
								<Grid item>
									<Link href="/login" variant="body2">
										Already have an account? Sign in
									</Link>
								</Grid>
							</Grid>
						</Form>
					)}
				</Formik>
			</div>
		</Container>
	)
}

SignUpPage.propTypes = {
	signUpUser: PropTypes.func.isRequired,
	history: PropTypes.object.isRequired,
}

function mapStateToProps(state) {
	return {
		auth: state.auth,
	}
}

const mapDispatchToProps = {
	signUpUser,
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUpPage)

// import React, { useState } from 'react'
// import { connect } from 'react-redux'
// import PropTypes from 'prop-types'
// import {
// 	Avatar,
// 	Button,
// 	CssBaseline,
// 	TextField,
// 	Link,
// 	Grid,
// 	Typography,
// 	Container,
// } from '@material-ui/core'
// import { makeStyles } from '@material-ui/core/styles'
// import { signUpUser } from '../../redux/actions/auth'

// const useStyles = makeStyles((theme) => ({
// 	paper: {
// 		marginTop: theme.spacing(8),
// 		display: 'flex',
// 		flexDirection: 'column',
// 		alignItems: 'center',
// 	},
// 	avatar: {
// 		margin: theme.spacing(1),
// 		backgroundColor: theme.palette.secondary.main,
// 	},
// 	form: {
// 		width: '100%', // Fix IE 11 issue.
// 		marginTop: theme.spacing(1),
// 	},
// 	submit: {
// 		margin: theme.spacing(3, 0, 2),
// 	},
// }))

// const SignUpPage = ({ signUpUser, history }) => {
// 	const classes = useStyles()

// 	const [state, setState] = useState({
// 		email: '',
// 		username: '',
// 		password: '',
// 		cpassword: '',
// 	})

// 	const handleChange = (event) => {
// 		const { name, value } = event.target
// 		setState({ ...state, [name]: value })
// 	}

// 	const signUp = async (event) => {
// 		event.preventDefault()
// 		const { email, username, password, cpassword } = state

// 		await signUpUser(email, username, password, cpassword)
// 		history.push('/')
// 	}

// 	return (
// 		<Container component="main" maxWidth="xs">
// 			<CssBaseline />
// 			<div className={classes.paper}>
// 				<Avatar className={classes.avatar}></Avatar>
// 				<Typography component="h1" variant="h5">
// 					Sign Up
// 				</Typography>
// 				<form className={classes.form} noValidate>
// 					<Grid container spacing={2}>
// 						<Grid item xs={12}>
// 							<TextField
// 								variant="outlined"
// 								required
// 								fullWidth
// 								id="email"
// 								label="Email Address"
// 								name="email"
// 								autoComplete="email"
// 								autoFocus
// 								onChange={handleChange}
// 							/>
// 						</Grid>
// 						<Grid item xs={12}>
// 							<TextField
// 								variant="outlined"
// 								required
// 								fullWidth
// 								id="username"
// 								label="Username"
// 								name="username"
// 								autoComplete="username"
// 								onChange={handleChange}
// 							/>
// 						</Grid>
// 						<Grid item xs={12}>
// 							<TextField
// 								variant="outlined"
// 								required
// 								fullWidth
// 								name="password"
// 								label="Password"
// 								type="password"
// 								id="password"
// 								autoComplete="current-password"
// 								onChange={handleChange}
// 							/>
// 						</Grid>
// 						<Grid item xs={12}>
// 							<TextField
// 								variant="outlined"
// 								required
// 								fullWidth
// 								name="cpassword"
// 								label="Confirm Password"
// 								type="password"
// 								id="cpassword"
// 								autoComplete="current-password"
// 								onChange={handleChange}
// 							/>
// 						</Grid>
// 					</Grid>
// 					<Button
// 						type="submit"
// 						fullWidth
// 						variant="contained"
// 						color="primary"
// 						className={classes.submit}
// 						onClick={signUp}
// 					>
// 						Sign Up
// 					</Button>
// 					<Grid container justify="flex-end">
// 						<Grid item>
// 							<Link href="/login" variant="body2">
// 								Already have an account? Sign in
// 							</Link>
// 						</Grid>
// 					</Grid>
// 				</form>
// 			</div>
// 		</Container>
// 	)
// }

// SignUpPage.propTypes = {
// 	signUpUser: PropTypes.func.isRequired,
// 	history: PropTypes.object.isRequired,
// }

// const mapDispatchToProps = {
// 	signUpUser,
// }

// export default connect(null, mapDispatchToProps)(SignUpPage)
