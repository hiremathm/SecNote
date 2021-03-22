import React from 'react'

import Card from './Card'
import classes from '../CSS/Contests.module.css'

const Form = (props) => {
	return (
		<div className = {classes.ContestForm}>
			<Card cardStyles = {classes.ContestFormCard}>
				{props.children}
			</Card>
		</div>
	)
}

export default Form;