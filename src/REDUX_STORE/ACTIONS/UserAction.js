export const AUTHENTICATION = 'AUTHENTICATION'
export const LOGOUT = 'LOGOUT'
export const SET_USERS = 'SET_USERS'

export const login = (email, password) => {
	return async (dispatch, getState) => {
		const response = await fetch(
	      	'https://arcane-sea-09236.herokuapp.com/users/authenticate',
	      	{
	        	method: 'POST',
	        	headers: {
	          	'Content-Type': 'application/json'
	        	},
		        body: JSON.stringify({
		          	email: email,
		          	password: password,
		        })
      		}
    	);

		const responseData = await response.json()
		if(!response.ok){
			throw new Error(responseData.error.message)
		}
		dispatch(authenticate(responseData.token, email))
		saveData(responseData.token)
		dispatch(getAllUsers())
	}
}

export const signup = (email, password) => {
	return async dispatch => {
		const response = await fetch(
	      	'https://arcane-sea-09236.herokuapp.com/users/signup',
	      	{
	        	method: 'POST',
	        	headers: {
	          	'Content-Type': 'application/json'
	        	},
		        body: JSON.stringify(
		        	{
		        		authentication: {
		          			email: email,
		          			password: password
		        		}
		        	}
		        )
      		}
    	);

		if(!response.ok){
		 	throw new Error('Opps! Something went wrong.')
		}
	}
}

export const getAllUsers = () => {
	return async dispatch => {
		const userData = JSON.parse(localStorage.getItem('userData'))

		const response = await fetch(
	      	'https://arcane-sea-09236.herokuapp.com/users',
	      	{
	        	method: 'GET',
	        	headers: {
	          		'Content-Type': 'application/json',
	          		'x-auth': userData.token
	        	}
      		}
    	);
		const responseData = await response.json()

		if(!response.ok){
		 	throw new Error('Opps! Something went wrong.')
		}
		
		dispatch({
			type: 'SET_USERS',
			users: responseData.users
		})
	}
}

export const authenticate = (token , userId) => {
	return dispatch => {
		dispatch({
			type: AUTHENTICATION,
			token: token,
			userId: userId
		})
	} 
}

export const logout = (token, userId) => {
	localStorage.removeItem('userData')
	return {type: LOGOUT}
}

const saveData = (token) => {
	localStorage.setItem('userData', JSON.stringify({token: token}))
}