import { Button, Typography } from '@material-ui/core'
import React from 'react'

function PageNotFound() {
	return (
		<div align="center">
			<Typography variant="h1">404</Typography>
			<Button color="primary" href="/" variant="outlined">
				Return Home
			</Button>
		</div>
	)
}

export default PageNotFound
