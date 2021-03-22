import React, {useContext, useState} from 'react'
import PulseLoader from "react-spinners/PulseLoader";
import { css } from "@emotion/core";
import { connect } from 'react-redux'
import {useDispatch} from 'react-redux'

import {VALIDATOR_REQUIRE, VALIDATOR_EMAIL, VALIDATOR_MIN} from '../../UTIL/validators'
import {useForm} from '../../CUSTOM_HOOKS/formHook'

import Card from '../../UI/Card'
import Button from '../../UI/Button'
import Input from '../../UI/Input'

import classes from '../../CSS/Auth.module.css'

// actions
import { login, signup } from '../../REDUX_STORE/ACTIONS/UserAction'

import { AuthContext } from '../../CONTEXTS/AuthContext'

const Auth = (props) => {
	const Auth = useContext(AuthContext)

	const override = css`
	  display: block;
	  margin: 0 auto;
	  color: yellow;
	`;

	const dispatch = useDispatch()
	const [isLoading, setIsLoading] = useState(false)
	const [isInvalidLogin, setInvalidLogin] = useState(false)
	const [message, setMessage] = useState()
	const [isLoginMode, setIsLoginMode] = useState(true)
	const [formState, inputHandler] = useForm({
            email: {
                value: '',
                isValid: false
            },
            password: {
                value: '',
                isValid: false
            }
        }, false)
	

	const setMessageTimeout = (message) => {
		setMessage(message)
		setTimeout(() => {
			setMessage('')
			setInvalidLogin(false)
		}, 1000)
	}

	const sumbmitHandler = async (e) => {
		e.preventDefault()

		let formData = {
            email: formState.inputs.email.value,
            password: formState.inputs.password.value
        }

        try{
        	setIsLoading(true)
        	if(isLoginMode){
				const {email, password} = formData
		        await dispatch(login(email, password))
		        setMessageTimeout('Successfully SignedIn !!!')
		        setTimeout(() => {
		        	setIsLoading(false)
		        	setInvalidLogin(false)
		        	Auth.login()
		        	props.history.push('/notes')
		        }, 1000)        		
        	}else{
	        	const {email, password} = formData
		        await dispatch(signup(email, password))
		        setMessageTimeout('Successfully Registered !!!')
		        setTimeout(() => {
		        	setIsLoading(false)
		        	setInvalidLogin(false)
					setIsLoginMode(true)
		        }, 1000)
        	}
        }catch(error){
        	setInvalidLogin(true)
        	setMessageTimeout(error.message)
        	setIsLoading(false)
        }
	}

	const changeAuthHandler = () => {
		setIsLoginMode(!isLoginMode)
	}

	const authText = isLoginMode ? 'SignIn' : 'SignUp'

	return (
		<div className = {classes.Authentication}>
			<Card cardstyles = {classes.LoginForm} >
				{isInvalidLogin && <p>{message}</p>}
				{!isInvalidLogin && <p style = {{color: 'green',  textDecoration: 'none'}}>{message}</p>}
				
				<form onSubmit = {sumbmitHandler} className = {classes.LoginForm}>
					<Input
	                	inputtype = "input" 
	                    type = "text"
	                    id = "email"
	                    placeholder = "Enter email"
	                    label = "Email"
	                    onInput = {inputHandler}
	                    errortext = "Please enter valid email."
	                    validators = {[VALIDATOR_REQUIRE(), VALIDATOR_EMAIL()]}
	                />

	                <Input 
	                	inputtype = "input"
	                    type = "password"
	                    id = "password"
	                    placeholder = "Enter password"
	                    element = "input"
	                    label = "Password"
	                    onInput = {inputHandler}
	                    errortext = "Please enter valid password."
	                    validators = {[VALIDATOR_REQUIRE(), VALIDATOR_MIN(6)]}
	                />

	                <Button 
	                	type = "submit"
	                	size = "Small"
	                	disabled = {!formState.formIsValid}
	                >
	                	{isLoading ? <PulseLoader color="white" loading={isLoading} size={5} css={override}/> : authText}
	                </Button>

				</form>
				<strong onClick = {changeAuthHandler}>{isLoginMode ? 'Are you new User?' : 'Are you registered already?'}</strong>
			</Card>
		</div>
	)
}

const mapStateToProps = (state) => {
    return {user: state.user}
}

export default connect(mapStateToProps)(Auth);