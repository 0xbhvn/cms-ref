import React, { useState, Fragment } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { NavLink, useHistory } from 'react-router-dom'
import './Header.css'
import { makeStyles } from '@material-ui/core/styles'
import {
	Button,
	Toolbar,
	Menu,
	MenuItem,
	Link,
	Typography,
} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import SearchBar from 'material-ui-search-bar'
import { logoutUser } from '../../redux/actions/auth'

const useStyles = makeStyles((theme) => ({
	toolbar: {
		borderBottom: `1px solid ${theme.palette.divider}`,
	},
	toolbarTitle: {
		flex: 1,
		fontFamily: '"Dela Gothic One", cursive',
	},
	toolbarSecondary: {
		justifyContent: 'space-between',
		overflowX: 'auto',
	},
	toolbarLink: {
		padding: theme.spacing(1),
		flexShrink: 0,
	},
}))

function Header(props) {
	const classes = useStyles()
	const { auth, logoutUser } = props

	const history = useHistory()

	const [anchorEl, setAnchorEl] = useState(null)

	const [data, setData] = useState({ search: '' })

	const goSearch = (e) => {
		history.push({
			pathname: '/search/',
			search: `?search=${data.search}`,
		})
		window.location.reload()
	}

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget)
	}

	const handleClose = () => {
		setAnchorEl(null)
	}

	const handleLogout = async () => {
		await logoutUser()
		history.push('/login/')
	}

	return (
		<Fragment>
			<Toolbar className={classes.toolbar}>
				<Typography
					component="h2"
					variant="h5"
					color="inherit"
					align="left"
					className={classes.toolbarTitle}
				>
					<Link component={NavLink} to="/" color="textPrimary">
						Bhaven's Blog
					</Link>
				</Typography>
				<SearchBar
					value={data.search}
					onChange={(newValue) => setData({ search: newValue })}
					onRequestSearch={() => goSearch(data.search)}
				/>
				<Button
					aria-controls="simple-menu"
					aria-haspopup="true"
					onClick={handleClick}
				>
					<MenuIcon></MenuIcon>
				</Button>
				<Menu
					id="simple-menu"
					anchorEl={anchorEl}
					keepMounted
					open={Boolean(anchorEl)}
					onClose={handleClose}
				>
					{auth.user ? (
						auth.user.is_staff ? (
							<div>
								<MenuItem onClick={handleClose}>
									<Link
										component={NavLink}
										to="/dashboard/articles"
										variant="button"
										color="textPrimary"
									>
										Article Dashboard
									</Link>
								</MenuItem>
							</div>
						) : (
							<div></div>
						)
					) : (
						<div></div>
					)}
					{auth.user ? (
						auth.user.is_superuser ? (
							<div>
								<MenuItem onClick={handleClose}>
									<Link
										component={NavLink}
										to="/dashboard/users"
										variant="button"
										color="textPrimary"
									>
										User Dashboard
									</Link>
								</MenuItem>
							</div>
						) : (
							<div></div>
						)
					) : (
						<div></div>
					)}
					{auth.token ? (
						<div>
							<MenuItem onClick={handleClose}>
								<Link
									component={NavLink}
									to="#"
									variant="button"
									color="textPrimary"
									onClick={handleLogout}
								>
									Logout
								</Link>
							</MenuItem>
						</div>
					) : (
						<div>
							<MenuItem onClick={handleClose}>
								<Link
									component={NavLink}
									to="/login"
									variant="button"
									color="textPrimary"
								>
									Login
								</Link>
							</MenuItem>
							<MenuItem onClick={handleClose}>
								<Link
									component={NavLink}
									to="/signup"
									variant="button"
									color="textPrimary"
								>
									Sign Up
								</Link>
							</MenuItem>
						</div>
					)}
				</Menu>
			</Toolbar>
		</Fragment>
	)
}

Header.propTypes = {
	auth: PropTypes.object.isRequired,
	logoutUser: PropTypes.func.isRequired,
}

function mapStateToProps(state) {
	return {
		auth: state.auth,
	}
}

const mapDispatchToProps = {
	logoutUser,
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
