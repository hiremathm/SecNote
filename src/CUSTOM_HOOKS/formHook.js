import { useCallback, useReducer } from 'react'

const formReducer = (state, action) => {
	let updatedState = {}
	switch(action.type){
		case 'INPUT_CHANGE':
			let formIsValid = true;
			for(const inputId in state.inputs){
				if(!state.inputs[inputId]){
					continue
				}
				if(inputId === action.inputId){
					formIsValid = formIsValid && action.isValid
				}else{
					formIsValid = formIsValid && state.inputs[inputId].isValid
				}
			}

			updatedState = {
				...state,
				inputs: {
					...state.inputs,
					[action.inputId]: {
						value: action.value,
						isValid: action.isValid
					}
				},
				formIsValid
			}

			return updatedState;
		case 'SET_DATA':
			updatedState = {
				...state, 
				inputs: action.inputs,
				formIsValid: action.formIsValid
			}
			return updatedState
		default: 
			return state
	}
}

export const useForm = (initialInputs, initialFormValidity) => {
	const [formState, dispatchForm] = useReducer(
		formReducer, { inputs: initialInputs, formIsValid: initialFormValidity }
	)
	const inputHandler = useCallback((inputId, value, isValid) => {
		dispatchForm({
			type: 'INPUT_CHANGE',
			value,isValid,inputId
		})		
	}, [])

	const setFormData = useCallback((editForm, formIsValid) => {
		dispatchForm({
			type: 'SET_DATA',
			inputs: editForm.inputs, formIsValid 
		})
	}, [])
	return [formState, inputHandler, setFormData]
}