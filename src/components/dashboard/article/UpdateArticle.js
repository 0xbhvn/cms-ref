import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'
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
	CircularProgress,
} from '@material-ui/core'
import NoteAddIcon from '@material-ui/icons/NoteAdd'
import { makeStyles } from '@material-ui/core/styles'
import { fetchArticle, updateArticle } from '../../../redux/actions/articleData'

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
		.max(2800, 'Body too long'),
	category: Yup.string()
		.required('Category cannot be blank')
		.max(60, 'Category should not exceed 60 characters'),
})

const UpdateArticle = (props) => {
	const classes = useStyles()
	const { article, fetchArticle, updateArticle, history } = props
	const { slug } = useParams()

	// eslint-disable-next-line
	useEffect(async () => {
		fetchArticle(slug)
		// eslint-disable-next-line
	}, [])

	return article.article === null ? (
		<div>
			<CircularProgress />
		</div>
	) : (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<div className={classes.paper}>
				<NoteAddIcon className={classes.avatar} />
				<Typography component="h1" variant="h5">
					Update Article
				</Typography>
				<Formik
					validateOnChange={true}
					initialValues={{
						title: article.article.title,
						body: article.article.body,
						category: article.article.category,
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
						if (!!image) {
							formData.append('image', image)
						}
						await updateArticle(slug, formData)
						history.push('/dashboard/articles')
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
							<img
								src={article.article.image.split('?')[0]}
								alt={article.article.title}
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

UpdateArticle.propTypes = {
	fetchArticle: PropTypes.func.isRequired,
	updateArticle: PropTypes.func.isRequired,
	history: PropTypes.object.isRequired,
}

function mapStateToProps(state) {
	return {
		article: state.articleData,
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		fetchArticle: (slug) => dispatch(fetchArticle(slug)),
		updateArticle: (slug, formData) =>
			dispatch(updateArticle(slug, formData)),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateArticle)
