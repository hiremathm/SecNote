import React, {useState, useCallback, useEffect} from 'react'

import {useSelector, useDispatch} from 'react-redux'
import { getAllContributors } from '../../REDUX_STORE/ACTIONS/UserAction'

import { css } from "@emotion/core";

import Card from '../../UI/Card'
import Input from '../../UI/Input'
import Button from '../../UI/Button'
import classes from '../../CSS/Note.module.css'
import Backdrop from '../../UI/Backdrop'

import { useForm } from '../../CUSTOM_HOOKS/formHook'

import {VALIDATOR_REQUIRE} from '../../UTIL/validators'

import FadeLoader from "react-spinners/FadeLoader"

const Collabrator = (props) => {
	const { id } = props.match.params
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

	const fetchAllContributors = useCallback(async() => {
		let allUsers = []
		try {
			await dispatch(getAllContributors(id))
		}catch(error){
			setErrorText(error.message)
		}
		
	}, [dispatch, getAllContributors, setErrorText, id])

	useEffect(() => {
		fetchAllContributors()
	}, [fetchAllContributors])

	const contributors = useSelector(state => state.users.contributors)
	console.log("Contributors",contributors)

	return (
		<div className = {classes.NoteForm}>
			<Card cardstyles = {classes.NoteFormCard}>
				<h3>Contributors</h3>
				<table border = "1">
					<thead><td>Email</td><td>Role</td></thead>
					<tbody>
						{
							contributors.length > 0 && contributors.map(contributor => <tr key = {contributor.id}><td>{contributor.user_email}</td> <td>{contributor.role_name}</td></tr>)
						}
					</tbody>
				</table>
			</Card>
		</div>
	)
}

export default Collabrator;