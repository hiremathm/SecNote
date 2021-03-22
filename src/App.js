import React,{useCallback, useEffect, useState} from 'react'

import {BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'

import Layout from './UI/Layout'

import Auth from './CONTAINERS/Auth/Auth'
import { AuthContext } from './CONTEXTS/AuthContext'

import Notes from './CONTAINERS/Notes/Index'

import NoteForm from './CONTAINERS/Notes/NoteForm'


import Users from './CONTAINERS/Auth/User'

const App = () => {

	const [isLoggedIn, setIsLoggedIn] = useState(false)

	const login = useCallback(() => {
		setIsLoggedIn(true)
	}, [setIsLoggedIn])

	const logout = useCallback(() => {
		setIsLoggedIn(false)
	}, [setIsLoggedIn])

	useEffect(() => {
		const userData = localStorage.getItem('userData')
		if(userData){
			setIsLoggedIn(true)
		}else{
			setIsLoggedIn(false)
		}
	}, [setIsLoggedIn])

  return (
  	<AuthContext.Provider value = {{isLoggedIn, login, logout}}>
	  	<BrowserRouter>
			<Layout>
				{
					isLoggedIn ? (
					<>
						<Switch>
							<Route path = "/notes" component = {Notes} exact />
							<Route path = "/notes/new" component = {NoteForm} exact />
							<Route path = "/notes/edit/:id" component = {NoteForm} exact />
							<Route path = "/users/:id" component = {Users} exact />
							<Redirect to = "/notes"/>
						</Switch>
		    		</>
		    	) : (
		    		<>
		    			<Switch>
							<Route path = "/authentication" component = {Auth} exact />
							<Redirect to = "/authentication" />
						</Switch>
		    		</>
	    		)}
    		</Layout>
	    </BrowserRouter>
    </AuthContext.Provider>
  )
}

export default App;