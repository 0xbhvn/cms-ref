import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Form, Formik, useField } from 'formik'
import * as Yup from 'yup'
import {
	Button,
	CssBaseline,
	TextField,
	Input,
	Typography,
	Container,
} from '@material-ui/core'
import NoteAddIcon from '@material-ui/icons/NoteAdd'
import { makeStyles } from '@material-ui/core/styles'
import { createArticle } from '../../../redux/actions/articleData'

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
			multiline={multiline}
			type={type}
			helperText={errors}
			error={!!errors}
		/>
	)
}

const validationSchema = Yup.object().shape({
	title: Yup.string()
		.required('Title cannot be blank')
		.max(140, 'Title should not exceed 140 characters'),
	body: Yup.string()
		.required('Body cannot be blank')
		.max(14000, 'Body too long'),
	category: Yup.string()
		.required('Category cannot be blank')
		.max(60, 'Category should not exceed 60 characters'),
	image: Yup.mixed().required('Article must have an image'),
})

const CreateArticle = (props) => {
	const classes = useStyles()
	const { article, createArticle, history } = props
	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<div className={classes.paper}>
				<NoteAddIcon className={classes.avatar} />
				<Typography component="h1" variant="h5">
					Create Article
				</Typography>
				<Formik
					validateOnChange={true}
					initialValues={{
						title: '',
						body: '',
						category: '',
						image: null,
					}}
					validationSchema={validationSchema}
					onSubmit={async (data, { setSubmitting }) => {
						setSubmitting(true)
						const { title, body, category, image } = data
						let formData = new FormData()
						formData.append('title', title)
						formData.append('body', body)
						formData.append('category', category)
						formData.append('image', image)
						await createArticle(formData)
						history.push('/')
						setSubmitting(false)
					}}
				>
					{({
						values,
						errors,
						handleChange,
						isSubmitting,
						setFieldValue,
					}) => (
						<Form className={classes.form}>
							<InputTextField
								name="title"
								id="title"
								placeholder="Title"
								label="Title"
								autoFocus
							/>
							<InputTextField
								name="body"
								id="body"
								placeholder="Body"
								label="Body"
								multiline
							/>
							<InputTextField
								name="category"
								id="category"
								placeholder="Category"
								label="Category"
							/>
							<Input
								accept="image/*"
								fullWidth
								className={classes.input}
								id="image"
								onChange={(event) => {
									setFieldValue(
										'image',
										event.currentTarget.files[0]
									)
								}}
								name="image"
								type="file"
							/>
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
								{article.error}
							</Typography>
						</Form>
					)}
				</Formik>
			</div>
		</Container>
	)
}

CreateArticle.propTypes = {
	createArticle: PropTypes.func.isRequired,
	history: PropTypes.object.isRequired,
}

function mapStateToProps(state) {
	return {
		article: state.articleData,
	}
}

const mapDispatchToProps = {
	createArticle: (formData) => createArticle(formData),
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateArticle)
