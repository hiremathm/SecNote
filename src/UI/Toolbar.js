import React from 'react'

import classes from '../CSS/Toolbar.module.css'


import NavigationItems from './NavigationItems'
import DrawerToggle from './DrawerToggle'

const toolbar = (props) => {
	return (
		<header className = {classes.Toolbar}>
			<DrawerToggle clicked = {props.drawerToggleClicked}/>
			<div className = {classes.homeTab}>
				Keep Note
			</div>
			<nav className = {classes.DesktopOnly}>
				<NavigationItems clicked = {props.drawerToggleClicked}/>
			</nav>
		</header>
	)
}

export default toolbar;