import {
	createStore, combineReducers, applyMiddleware
} from 'redux'

import ReduxThunk from 'redux-thunk'

import UserReducer from '../REDUCERS/UserReducer'
import NoteReducer from '../REDUCERS/NoteReducer'

const configureStore = () => {
	const store = createStore(combineReducers({
		users: UserReducer,
		notes: NoteReducer
	}),applyMiddleware(ReduxThunk))
	return store;
}

export default configureStore;