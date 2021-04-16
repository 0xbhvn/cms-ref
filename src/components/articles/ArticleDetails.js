import React, { useEffect } from 'react'
import { useParams } from 'react-router'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { CircularProgress, Container, Typography } from '@material-ui/core'
import { fetchArticle } from '../../redux/actions/articleData'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
	heroContent: {
		backgroundColor: theme.palette.background.paper,
		padding: theme.spacing(8, 0, 6),
	},
	body: {
		whiteSpace: 'pre-line',
		paddingTop: '60px',
	},
	image: {
		flex: 1,
		align: 'center',
		maxWidth: '960px',
		resizeMode: 'contain',
	},
}))
function ArticleDetails(props) {
	const { article, fetchArticle } = props
	const { slug } = useParams()

	const classes = useStyles()

	// eslint-disable-next-line
	useEffect(async () => {
		await fetchArticle(slug)
		// eslint-disable-next-line
	}, [])

	return (
		<Container maxWidth="md">
			{article.loading ? (
				<div className={classes.heroContent}>
					<CircularProgress align="center" />
				</div>
			) : article.article ? (
				<div className={classes.heroContent}>
					<Typography
						component="h1"
						variant="h2"
						align="left"
						color="textPrimary"
						gutterBottom
					>
						{article.article.title}
					</Typography>
					<img
						src={'http://localhost:8000' + article.article.image}
						alt={article.article.title}
						className={classes.image}
					/>
					<Typography variant="subtitle1" color="inherit">
						Posted by {article.article.author}
					</Typography>
					<Typography
						variant="h5"
						align="justify"
						color="textSecondary"
						className={classes.body}
						paragraph
					>
						{article.article.body}
					</Typography>
				</div>
			) : (
				<div></div>
			)}
			<div className={classes.heroContent}>
				<Typography
					component="h1"
					variant="h2"
					align="center"
					color="textSecondary"
					gutterBottom
				>
					{article.error}
				</Typography>
			</div>
		</Container>
	)
}

const mapStateToProps = (state) => {
	return {
		article: state.articleData,
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		fetchArticle: (slug) => dispatch(fetchArticle(slug)),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticleDetails)

ArticleDetails.propTypes = {
	fetchArticle: PropTypes.func,
	article: PropTypes.object,
}
