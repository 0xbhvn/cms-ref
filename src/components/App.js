import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import PageNotFound from '../components/common/PageNotFound'
import Header from './common/Header'
import Footer from './common/footer'
import PrivateRoute from './authentication/PrivateRoute'
import StaffRoute from './authentication/StaffRoute'
import SuperRoute from './authentication/SuperRoute'
import LoginPage from './authentication/LoginPage'
import SignUpPage from './authentication/SignUpPage'
import Articles from './articles/Articles'
import ArticleDetails from './articles/ArticleDetails'
import ArticleDashboard from './dashboard/article/ArticleDashboard'
import CreateArticle from './dashboard/article/CreateArticle'
import UpdateArticle from './dashboard/article/UpdateArticle'
import DeleteArticle from './dashboard/article/DeleteArticle'
import UserDashboard from './dashboard/user/UserDashboard'
import UpdateUser from './dashboard/user/UpdateUser'
import DeleteUser from './dashboard/user/DeleteUser'
import store from '../redux/store'
import { loadUser } from '../redux/actions/auth'
import Search from './articles/Search'

class App extends Component {
	componentDidMount() {
		if (store.getState().auth.token) {
			store.dispatch(loadUser())
		}
	}

	render() {
		return (
			<Provider store={store}>
				<Router>
					<Header />
					<Switch>
						<PrivateRoute exact path="/" component={Articles} />
						<PrivateRoute
							path="/articles/:slug"
							component={ArticleDetails}
						/>
						<Route path="/search" component={Search} />
						<StaffRoute
							exact
							path="/dashboard/articles"
							component={ArticleDashboard}
						/>
						<StaffRoute
							exact
							path="/dashboard/articles/create"
							component={CreateArticle}
						/>
						<StaffRoute
							path="/dashboard/articles/update/:slug"
							component={UpdateArticle}
						/>
						<StaffRoute
							path="/dashboard/articles/delete/:slug"
							component={DeleteArticle}
						/>
						<SuperRoute
							exact
							path="/dashboard/users"
							component={UserDashboard}
						/>
						<SuperRoute
							path="/dashboard/users/update/:username"
							component={UpdateUser}
						/>
						<SuperRoute
							path="/dashboard/users/delete/:username"
							component={DeleteUser}
						/>
						<Route path="/login" component={LoginPage} />
						<Route path="/signup" component={SignUpPage} />
						<Route component={PageNotFound} />
					</Switch>
					<Footer />
				</Router>
			</Provider>
		)
	}
}

export default App
