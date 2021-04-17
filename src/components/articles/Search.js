import React, { useState, useEffect } from 'react'
import axiosAPI from '../api/axiosApi'
import {
	Card,
	CardActionArea,
	CardContent,
	CardMedia,
	Grid,
	Typography,
	Container,
	Hidden,
	CssBaseline,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
	card: {
		display: 'flex',
		margin: '20px',
	},
	cardDetails: {
		flex: 1,
	},
	cardMedia: {
		width: 160,
	},
	link: {
		margin: theme.spacing(1, 1.5),
	},
	cardHeader: {
		backgroundColor:
			theme.palette.type === 'light'
				? theme.palette.grey[200]
				: theme.palette.grey[700],
	},
	articleTitle: {
		fontSize: '16px',
		textAlign: 'left',
	},
	articleText: {
		display: 'flex',
		justifyContent: 'left',
		alignItems: 'baseline',
		fontSize: '12px',
		textAlign: 'left',
		marginBottom: theme.spacing(2),
	},
	maingrid: {
		marginTop: '20px',
	},
}))

const Search = () => {
	const classes = useStyles()
	const search = 'search'
	const [state, setState] = useState({
		search: '',
		articles: [],
	})

	useEffect(() => {
		axiosAPI
			.get(`articles/${search}/` + window.location.search)
			.then((res) => {
				const allArticles = res.data
				setState({ articles: allArticles })
			})
	}, [setState])

	return (
		<React.Fragment>
			<CssBaseline />
			<Container maxWidth="lg">
				<h1>Search Results</h1>
				<Grid item xs={12} md={6} className={classes.maingrid}>
					{state.articles.map((article) => {
						return (
							<CardActionArea
								component="a"
								href={`/article/${article.slug}`}
							>
								<Card className={classes.card}>
									<div className={classes.cardDetails}>
										<CardContent>
											<Typography
												component="h2"
												variant="h5"
											>
												{article.title}
											</Typography>
											<Typography
												variant="subtitle1"
												color="primary"
											>
												Posted by {article.author}
											</Typography>
										</CardContent>
									</div>
									<Hidden xsDown>
										<CardMedia
											className={classes.cardMedia}
											image={article.image.split('?')[0]}
											title={article.title}
										/>
									</Hidden>
								</Card>
							</CardActionArea>
						)
					})}
				</Grid>
			</Container>
		</React.Fragment>
	)
}
export default Search
