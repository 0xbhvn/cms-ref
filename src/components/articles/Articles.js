import {
	Card,
	CardContent,
	CardMedia,
	CircularProgress,
	Container,
	Grid,
	Link,
	Typography,
} from '@material-ui/core'
import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { fetchArticles } from '../../redux/actions/articlesList'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
	heroContent: {
		backgroundColor: theme.palette.background.paper,
		padding: theme.spacing(8, 0, 6),
	},
	cardGrid: {
		paddingTop: theme.spacing(8),
		paddingBottom: theme.spacing(8),
	},
	card: {
		height: '100%',
		display: 'flex',
		flexDirection: 'column',
	},
	cardMedia: {
		paddingTop: '56.25%', // 16:9
	},
	cardContent: {
		flexGrow: 1,
	},
}))

function Articles(props) {
	const { articles, fetchArticles } = props
	const classes = useStyles()

	// eslint-disable-next-line
	useEffect(async () => {
		await fetchArticles()
		// eslint-disable-next-line
	}, [])

	return (
		<main>
			{articles.loading ? (
				<div className={classes.heroContent}>
					<CircularProgress align="center" />
				</div>
			) : (
				<div>
					<div className={classes.heroContent}>
						<Typography
							component="h1"
							variant="h2"
							align="center"
							color="textPrimary"
							gutterBottom
						>
							Latest Articles
						</Typography>
					</div>
					<div>
						<Container className={classes.cardGrid} maxWidth="md">
							<Grid container spacing={4}>
								{articles.articles.map((article) => (
									<Grid
										item
										key={article.id}
										xs={12}
										sm={6}
										md={4}
									>
										<Card className={classes.card}>
											<CardMedia
												className={classes.cardMedia}
												image={
													article.image.split('?')[0]
												}
											/>
											<Link
												href={`/articles/${article.slug}`}
											>
												<CardContent
													className={
														classes.cardContent
													}
												>
													<Typography
														gutterBottom
														variant="h5"
														component="h2"
													>
														{article.title}
													</Typography>
													<Typography
														gutterBottom
														variant="subtitle1"
													>
														Posted by{' '}
														{article.author}
													</Typography>
												</CardContent>
											</Link>
										</Card>
									</Grid>
								))}
							</Grid>
						</Container>
					</div>
				</div>
			)}
		</main>
	)
}

function mapStateToProps(state) {
	return {
		articles: state.articlesList,
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		fetchArticles: () => dispatch(fetchArticles()),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Articles)

Articles.propTypes = {
	fetchArticles: PropTypes.func,
	articles: PropTypes.object,
}
