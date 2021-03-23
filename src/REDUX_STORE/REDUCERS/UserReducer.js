import {AUTHENTICATION, LOGOUT, SET_USERS, SET_CONTRIBUTORS} from '../ACTIONS/UserAction'

const initialState = {
	token: null,
	userId: null,
	users: [],
	contributors: []
}

const userReducer = (state = initialState, action) => {
	switch(action.type){
		case AUTHENTICATION: 
			return {
				token: action.token,
				userId: action.userId
			}
		case LOGOUT: 
			return initialState
		case SET_USERS: 
			return {
				...state,
				users: action.users
			}
		case SET_CONTRIBUTORS:
			return {
				...state,
				contributors: action.contributors
			}
		default: 
			return state;
	}
}

export default userReducer;