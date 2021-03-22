import { GET_NOTES } from '../ACTIONS/NoteAction'

const initialState = {
	notes: []
}

const noteReducer = (state = initialState, action) => {
	switch(action.type){
		case GET_NOTES:
			return action.payload
		default: 
			return state
	}
}

export default noteReducer;