import React, {useState} from 'react'

import {useSelector, useDispatch} from 'react-redux'
import { share_notes } from '../../REDUX_STORE/ACTIONS/NoteAction'

import { css } from "@emotion/core";

import Card from '../../UI/Card'
import Input from '../../UI/Input'
import Button from '../../UI/Button'
import classes from '../../CSS/Note.module.css'
import Backdrop from '../../UI/Backdrop'

import { useForm } from '../../CUSTOM_HOOKS/formHook'

import {VALIDATOR_REQUIRE} from '../../UTIL/validators'

import FadeLoader from "react-spinners/FadeLoader"

const User = (props) => {
	const { id } = props.match.params

	const users = useSelector(state => state.users.users)

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
		user_id: obj
	}, false)

	const [isLoading, setIsLoading]= useState(false)
	const [errorText, setErrorText]= useState()
	const dispatch = useDispatch()

	const getAllUsers = () => {
		let allUsers = []
		
		if(users){
			allUsers = users.map(user => ({value: user.id, text: user.email}))
		}

		return allUsers
	}

	const submitHandler = async (e) => {
		e.preventDefault()
		
		try {
			setIsLoading(true)
			const formData = {
				user_id: formState.inputs.user_id.value,
				note_id: id
			}

			await dispatch(share_notes(formData))
			
			setTimeout(() => {
				setIsLoading(false)
				props.history.push("/notes")
			}, 1000)

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
				<p>Share Notes</p>
				
				<form onSubmit = {submitHandler}>
					<hr/>
					
					{errorText && <p style = {{fontSize: "16px", color: "red", textAlign: "center", margin: "10px"}}>{errorText}</p>}
					<div>{isLoading && <FadeLoader color="#ff0055" loading={isLoading} size={5} css={override}/>}</div>
					<Backdrop show = {isLoading}/>

					<div className = {classes.FormGroup}>
						<Input 
							inputtype = "select"
							id = "user_id"
							onInput = {inputHandler}
							errortext = "Required"
							validators = {[VALIDATOR_REQUIRE()]}
							setlabel = {true}
							label = "Select User *"
							Inputstyles = {classes.Inputid}
							value = {formState.inputs.user_id.isValid && formState.inputs.user_id.value}
							options = {getAllUsers()}
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

export default User;