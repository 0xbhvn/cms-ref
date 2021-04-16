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
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import { makeStyles } from '@material-ui/core/styles'
import { loginUser } from '../../redux/actions/auth'

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
	password: Yup.string().required('Password is required'),
})

const LoginPage = (props) => {
	const classes = useStyles()
	const { auth, loginUser, history } = props
	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<div className={classes.paper}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					Login
				</Typography>
				<Formik
					validateOnChange={true}
					initialValues={{ email: '', password: '' }}
					validationSchema={validationSchema}
					onSubmit={async (data, { setSubmitting }) => {
						setSubmitting(true)
						const { email, password } = data
						await loginUser(email, password)
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
								name="password"
								id="password"
								placeholder="Password"
								type="password"
								label="Password"
							/>
							<Button
								type="submit"
								fullWidth
								variant="contained"
								color="primary"
								disabled={isSubmitting}
								className={classes.submit}
							>
								Login
							</Button>
							<Typography color="secondary" align="center">
								{auth.error}
							</Typography>
							<Grid container>
								<Grid item>
									<Link href="/signup" variant="body2">
										Don't have an account? Sign Up
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

LoginPage.propTypes = {
	loginUser: PropTypes.func.isRequired,
	history: PropTypes.object.isRequired,
}

function mapStateToProps(state) {
	return {
		auth: state.auth,
	}
}

const mapDispatchToProps = {
	loginUser,
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage)
