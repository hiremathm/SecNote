import React, {useContext} from 'react'
import {NavLink} from 'react-router-dom'
import { IoLogOutOutline, IoLogInOutline } from "react-icons/io5";

import  {withRouter} from 'react-router-dom';

import { useDispatch } from 'react-redux'

import classes from '../CSS/NavigationItems.module.css'

// authcontext
import {AuthContext} from '../CONTEXTS/AuthContext'

// actions
import {logout} from '../REDUX_STORE/ACTIONS/UserAction'

const NavigationItems = (props) => {
	const auth = useContext(AuthContext)
	const dispatch = useDispatch()
	
	const logoutAuth = () => {
		dispatch(logout())
		auth.logout()
		props.history.push("/authentication")
	}

	return (
		<ul className = {classes.NavigationItems}>
			{!auth.isLoggedIn ? (
			<>
				<li className = {classes.NavigationItem} onClick = {props.clicked}>
					<NavLink to= "/authentication" exact>
						<IoLogInOutline style = {{color: 'white', height: '30px', width: '40px' }} />
					</NavLink>
				</li>
			</>
			) : (
			<>
				<li className = {classes.NavigationItem} >
					<NavLink to= "/notes" exact>
						Notes
					</NavLink>
				</li>

				<li className = {classes.NavigationItem} onClick = {logoutAuth}>
					<NavLink to ="#">
						<IoLogOutOutline style = {{color: 'white', height: '30px', width: '40px' }} />
					</NavLink>
				</li>
			</>
			)}
		</ul>
	)
}

export default withRouter(NavigationItems);