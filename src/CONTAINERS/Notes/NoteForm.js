import React, {useState} from 'react'
import { css } from "@emotion/core";
import {useSelector, useDispatch} from 'react-redux'
import FadeLoader from "react-spinners/FadeLoader"

import Card from '../../UI/Card'
import Input from '../../UI/Input'
import Button from '../../UI/Button'
import classes from '../../CSS/Note.module.css'
import Backdrop from '../../UI/Backdrop'

import {VALIDATOR_REQUIRE} from '../../UTIL/validators'

import { useForm } from '../../CUSTOM_HOOKS/formHook'

// actions 
import { postNote, editNote } from '../../REDUX_STORE/ACTIONS/NoteAction'

const NoteForm = (props) => {
	const {id} = props.match.params
	const override = css`
		display: block;
		margin: 0 auto;
		height: 15;
		width: 5;
	`;

	const obj = {
			value: '',
			isValid: ''
		}

	const [formState, inputHandler] = useForm({
		description: obj,
		name: obj,
	}, false)

	const [isLoading, setIsLoading]= useState(false)
	const [errorText, setErrorText]= useState()
	const dispatch = useDispatch()

	const notes = useSelector(state => state.notes)
	let oldNote = ""
	if(id){
		oldNote = notes.notes.find(note => note.id.toString() === id.toString())
		if(!oldNote){
			oldNote = notes.shared_notes.find(note => note.id.toString() === id.toString())
		}
	}else{
		oldNote = {}
	}

	const submitHandler = async (e) => {
		e.preventDefault()
		
		try {
			setIsLoading(true)
			const formData = {
				name: formState.inputs.name.value,
				description: formState.inputs.description.value
			}

			if(id && oldNote){
	 			await dispatch(editNote(formData, id))
			}else{
	 			await dispatch(postNote(formData))
			}
			
			setTimeout(() => {
				setIsLoading(false)
				props.history.push("/notes")
			}, 3000)

		}catch(error){
			setErrorText(error.message)
			setIsLoading(false)
			setTimeout(() => {
				setErrorText(null)
			}, 2000)
		}
	}

	return (
		<div className = {classes.NoteForm}>
			<Card cardstyles = {classes.NoteFormCard}>
				<p>Create New Note</p>
				
				<form onSubmit = {submitHandler}>
					<hr/>
					
					{errorText && <p style = {{fontSize: "16px", color: "red", textAlign: "center", margin: "10px"}}>{errorText}</p>}
					<div>{isLoading && <FadeLoader color="#ff0055" loading={isLoading} size={5} css={override}/>}</div>
					<Backdrop show = {isLoading}/>

					<div className = {classes.FormGroup}>
						<Input
		                	inputtype = "input" 
		                    type = "text"
		                    id = "name"
		                    placeholder = "Note Title"
		                    onInput = {inputHandler}
		                    errortext = "Required"
		                    validators = {[VALIDATOR_REQUIRE()]}
		                    label = "Title *"
		                    setlabel = {true}
		                    Inputstyles = {classes.Inputid}
		                    value = {oldNote.name}
		                />	
					</div>

					
					<div className = {classes.FormGroup}>
						<Input
		                	inputtype = "textarea" 
		                    type = "textarea"
		                    id = "description"
		                    placeholder = "Description"
		                    onInput = {inputHandler}
		                    errortext = "Required"
		                    validators = {[VALIDATOR_REQUIRE()]}
		                    label = "Description *"
		                    setlabel = {true}
		                    Inputstyles = {classes.Description}
		                    value = {oldNote.description}

		                />	
					</div>
					<div className = {classes.FormGroup}>
						<Button disabled = {!formState.formIsValid}>
							Submit
						</Button>
					</div>
				</form>
			</Card>
		</div>
	)
}

export default NoteForm;
