import React, {useReducer, useEffect} from 'react'
// import DateTimePicker from 'react-datetime-picker';

import classes from '../CSS/Input.module.css'
import { validate } from '../UTIL/validators'


const inputReducer = (state, action) => {
	switch(action.type){
		case 'CHANGE':
			return {
				...state,
				value: action.value,
				isValid: validate(action.value, action.validators)
			}
		case 'TOUCH':
			return {
				...state,
				isTouched: true
			}
		default: 
			return state
	}
}

const Input = (props) => {

	let initialState = {value: '', isValid: false, isTouched: false}
	
	if(props.inputtype === 'date'){
		initialState = {value: new Date().getDate(), isValid: true, isTouched: true}
	}
	const [inputState, dispatch] = useReducer(inputReducer, initialState)

	let inputElement = null;
	
	const inputChangeHandler = event => {		
		dispatch({
			type: 'CHANGE',
			value: event.target.value,
			validators: props.validators
		})
	}

	const touchHandler = () => {
		dispatch({
			type: 'TOUCH'
		})
	}
	
	switch(props.inputtype){
		case ('input') : 
			inputElement = <input  
				type = {props.type} 
				id = {props.id}
				name = {props.name}
				placeholder = {props.placeholder}
				className={props.Inputstyles ? props.Inputstyles : classes.InputElement}
				onChange = {inputChangeHandler}
				value = {inputState.value ? inputState.value : props.value }
				onBlur = {touchHandler}
			/>
			
			break;
		case ('textarea') : 
			inputElement = <textarea 
				className={props.Inputstyles ? props.Inputstyles : classes.InputElement}
				type = {props.type} 
				id = {props.id}
				name = {props.name}
				placeholder = {props.placeholder}
				onChange = {inputChangeHandler}
				value = {inputState.value ? inputState.value : props.value }
				onBlur = {touchHandler}
				maxLength = {props.maxlength}
			/>
			break;
		case ('select') :
			inputElement = <select 
				className={props.Inputstyles ? props.Inputstyles : classes.InputElement} 
				onChange = {inputChangeHandler}
				onBlur = {touchHandler}
				value = {inputState.value ? inputState.value : props.value }
				>
				{
					props.options.map(option => {
						return <option key = {option.value} value = {option.value}>{option.text}</option> 					
					})
				} 
			</select>
			break;
		
		default:
			inputElement = <input className = {props.Inputstyles ? props.Inputstyles : classes.InputElement} {...props} 
				onChange = {inputChangeHandler}
				value = {inputState.value}
				onBlur = {touchHandler}
			/>
	}

	const {id, onInput} = props
	const {value, isValid} = inputState

	useEffect(() => {
		onInput(id, value, isValid)
	}, [id, value, isValid, onInput])

	return (
		<div className = {classes.Input}>
			{props.setlabel && <label className = {classes.Label} >{props.label}</label>}
			{inputElement}
			{!inputState.isValid && inputState.isTouched && <p>{props.errortext}</p>}
		</div>
	)
}

export default Input;