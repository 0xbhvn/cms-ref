import { combineReducers } from 'redux'
import authReducer from './auth'
import articlesListReducer from './articlesList'
import articleDataReducer from './articleData'
import usersListReducer from './usersList'
import userDataReducer from './userData'

const rootReducer = combineReducers({
	auth: authReducer,
	articlesList: articlesListReducer,
	articleData: articleDataReducer,
	usersList: usersListReducer,
	userData: userDataReducer,
})

export default rootReducer
