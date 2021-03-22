import {AUTHENTICATION, LOGOUT, SET_USERS} from '../ACTIONS/UserAction'

const initialState = {
	token: null,
	userId: null
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
		default: 
			return state;
	}
}

export default userReducer;