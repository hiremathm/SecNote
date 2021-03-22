import React from 'react'

import Aux from '../HOC/Aux'
import NavigationItems from './NavigationItems'
import Backdrop from './Backdrop'

import classes from '../CSS/SideDrawer.module.css'

const SideDrawer = (props) => {

	let attachedClasses = [classes.SideDrawer, classes.Close];
    
    if(props.open){
    	attachedClasses = [classes.SideDrawer, classes.Open]
    }

	return (
		<Aux>
			<Backdrop show = {props.open} clicked = {props.closed}/>
			<div className = {attachedClasses.join(' ')}>
				<nav>
                    <NavigationItems  clicked = {props.closed}/>
                </nav>
			</div>
		</Aux>
	)
}

export default SideDrawer;