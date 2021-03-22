import React from 'react'

import classes from '../CSS/Layout.module.css'

import Aux from '../HOC/Aux'
import Toolbar from './Toolbar'
import SideDrawer from './SideDrawer'

class Layout extends React.Component {
	state = {
		showSideDrawer: false
	}

	sideDrawerToggleHandler = () => {
		this.setState((prevState) => {
			return {
				showSideDrawer: !prevState.showSideDrawer
			}
		})
	}

	sideDrawerClosedHandler = () => {
		this.setState({
			showSideDrawer: false
		})
	}

	render() {
		return (
			<Aux>
				<Toolbar drawerToggleClicked = {this.sideDrawerToggleHandler}/>
				<SideDrawer 
					open = {this.state.showSideDrawer}
					closed = {this.sideDrawerClosedHandler} 
				/>
				<main className = {classes.Content}>
					{this.props.children}
				</main>
			</Aux>
		)
	}
}

export default Layout;