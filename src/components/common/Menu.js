import React from 'react'
import { NavLink } from 'react-router-dom'
import { Button, Menu, MenuItem, Link } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'

export default function HeaderMenu() {
	const [anchorEl, setAnchorEl] = React.useState(null)

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget)
	}

	const handleClose = () => {
		setAnchorEl(null)
	}

	return (
		<div>
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
				<MenuItem onClick={handleClose}>
					<Link
						component={NavLink}
						to="/admin"
						variant="button"
						color="textPrimary"
					>
						Manage Articles
					</Link>
				</MenuItem>
				<MenuItem onClick={handleClose}>
					<Link
						component={NavLink}
						to="/superuser"
						variant="button"
						color="textPrimary"
					>
						Manage Users
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
						to="/logout"
						variant="button"
						color="textPrimary"
					>
						Logout
					</Link>
				</MenuItem>
			</Menu>
		</div>
	)
}
