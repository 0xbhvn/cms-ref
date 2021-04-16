import {
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
import { fetchUsers } from '../../../redux/actions/usersList'

import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
	heroContent: {
		backgroundColor: theme.palette.background.paper,
		padding: theme.spacing(8, 0, 6),
	},
}))

function UserDashboard(props) {
	const { users, fetchUsers } = props
	const classes = useStyles()

	// eslint-disable-next-line
	useEffect(async () => {
		await fetchUsers()
		// eslint-disable-next-line
	}, [])

	return (
		<div>
			{users.loading ? (
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
						<TableContainer className={classes.container}>
							<Table stickyHeader aria-label="sticky table">
								<TableHead>
									<TableRow>
										<TableCell align="left">
											Username
										</TableCell>
										<TableCell align="left">
											Email
										</TableCell>
										<TableCell align="left">
											Staff
										</TableCell>
										<TableCell align="left">
											Superuser
										</TableCell>
										<TableCell align="left">
											Action
										</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{users.users.map((user) => {
										return (
											<TableRow key={user.id}>
												<TableCell
													component="th"
													scope="row"
												>
													{user.username}
												</TableCell>
												<TableCell align="left">
													{user.email}
												</TableCell>
												<TableCell align="left">
													<input
														name="is_staff"
														type="checkbox"
														checked={user.is_staff}
														disabled
													/>
												</TableCell>
												<TableCell align="left">
													<input
														name="is_staff"
														type="checkbox"
														checked={
															user.is_superuser
														}
														disabled
													/>
												</TableCell>
												<TableCell align="left">
													<Link
														color="textPrimary"
														href={`/dashboard/users/update/${user.username}`}
														className={classes.link}
													>
														<EditIcon></EditIcon>
													</Link>
													<Link
														color="textPrimary"
														href={`/dashboard/users/delete/${user.username}`}
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
		users: state.usersList,
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		fetchUsers: () => dispatch(fetchUsers()),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(UserDashboard)

UserDashboard.propTypes = {
	fetchUsers: PropTypes.func,
	users: PropTypes.object,
}
