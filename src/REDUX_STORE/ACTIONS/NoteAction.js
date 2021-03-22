export const GET_NOTES = 'GET_NOTES'

export const get_notes = () => {
	return async(dispatch, getState) => {
		const userData = JSON.parse(localStorage.getItem('userData'))
		const response = await fetch(
	      	'http://localhost:3001/notes',
	      	{
	        	method: 'GET',
	        	headers: {
	          	'Content-Type': 'application/json',
	          	'Authorization': userData.token
	        	}
      		}
    	);

		const responseData = await response.json()
		if(!response.ok){
			throw new Error("Opps! Something went wrong.")
		}

		const {notes, shared_notes} = responseData
		console.log("shared_notes", shared_notes)
		dispatch(
			{
				type: GET_NOTES, 
				payload: {notes, shared_notes}
			}
		)
	}
}

export const share_notes = (note) => {
	return async(dispatch, getState) => {
		const userData = JSON.parse(localStorage.getItem('userData'))
		const url = `http://localhost:3001/notes/${note.note_id}/users/${note.user_id}/authorize-note`
		const response = await fetch(
	      	url,
	      	{
	        	method: 'POST',
	        	headers: {
	          	'Content-Type': 'application/json',
	          	'Authorization': userData.token
	        	},
	        	body: JSON.stringify({
					note:{
						role_id: 2
					}	
				})
      		}
    	);

    	const responseData = await response.json()
		console.log("authorize-note", responseData)
		if(!response.ok){
			throw new Error("Opps! Something went wrong.")
		}

	}

}

export const editNote = (formdata, id) => {
	return async(dispatch, getState) => {
		const userData = JSON.parse(localStorage.getItem('userData'))

		const response = await fetch(
	      	`http://localhost:3001/notes/${id}`,
	      	{
	        	method: 'PUT',
	        	headers: {
	          	'Content-Type': 'application/json',
	          	'Authorization': userData.token
	        	},
		        body: JSON.stringify(
		        	{
		        		notes: formdata
		        	}
		        )
      		}
    	);
	}

}

export const postNote = (formdata) => {
	console.log("formdata", formdata)

	return async(dispatch, getState) => {
		const userData = JSON.parse(localStorage.getItem('userData'))

		const response = await fetch(
	      	'http://localhost:3001/notes',
	      	{
	        	method: 'POST',
	        	headers: {
	          	'Content-Type': 'application/json',
	          	'Authorization': userData.token
	        	},
		        body: JSON.stringify(
		        	{
		        		notes: formdata
		        	}
		        )
      		}
    	);
	}

}

export const delete_note = (id) => {
	return async(dispatch, getState) => {
		const userData = JSON.parse(localStorage.getItem('userData'))
		console.log("id", id)
		const response = await fetch(
	      	'http://localhost:3001/notes/' + id ,
	      	{
	        	method: 'DELETE',
	        	headers: {
	          	'Content-Type': 'application/json',
	          	'Authorization': userData.token
	        	}
      		}
    	);

		const responseData = await response.json()
		console.log("responseData", responseData)

		dispatch(get_notes())
	}
}