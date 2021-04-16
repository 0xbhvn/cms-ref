import {
	Button,
	CircularProgress,
	Container,
	Link,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
} from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { fetchArticles } from '../../../redux/actions/articlesList'

import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
	heroContent: {
		backgroundColor: theme.palette.background.paper,
		padding: theme.spacing(8, 0, 6),
	},
}))

function ArticleDashboard(props) {
	const { articles, fetchArticles } = props
	const classes = useStyles()

	// eslint-disable-next-line
	useEffect(async () => {
		await fetchArticles()
		// eslint-disable-next-line
	}, [])

	return (
		<div>
			{articles.loading ? (
				<div>
					<CircularProgress />
				</div>
			) : (
				<Container
					maxWidth="md"
					component="main"
					className={classes.heroContent}
				>
					<Paper className={classes.root}>
						<div align="right">
							<Button
								href="/dashboard/articles/create"
								variant="contained"
								color="primary"
							>
								Add New Article
							</Button>
						</div>
						<br />
						<TableContainer className={classes.container}>
							<Table stickyHeader aria-label="sticky table">
								<TableHead>
									<TableRow>
										<TableCell>Author</TableCell>
										<TableCell align="left">
											Category
										</TableCell>
										<TableCell align="left">
											Title
										</TableCell>
										<TableCell align="left">
											Action
										</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{articles.articles.map((article) => {
										return (
											<TableRow>
												<TableCell
													component="th"
													scope="row"
												>
													{article.author}
												</TableCell>
												<TableCell align="left">
													{article.category}
												</TableCell>
												<TableCell align="left">
													<Link
														color="textPrimary"
														href={`/articles/${article.slug}`}
														className={classes.link}
													>
														{article.title}
													</Link>
												</TableCell>
												<TableCell align="left">
													<Link
														color="textPrimary"
														href={`/dashboard/articles/update/${article.slug}`}
														className={classes.link}
													>
														<EditIcon></EditIcon>
													</Link>
													<Link
														color="textPrimary"
														href={`/dashboard/articles/delete/${article.slug}`}
														className={classes.link}
													>
														<DeleteForeverIcon></DeleteForeverIcon>
													</Link>
												</TableCell>
											</TableRow>
										)
									})}
								</TableBody>
							</Table>
						</TableContainer>
					</Paper>
				</Container>
			)}
		</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ArticleDashboard)

ArticleDashboard.propTypes = {
	fetchArticles: PropTypes.func,
	articles: PropTypes.object,
}
