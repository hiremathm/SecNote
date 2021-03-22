import React from 'react'

import classes from '../CSS/Button.module.css'

const Button = (props) => {
	return (
		<button 
			className = {`${classes.Button} ${classes.Button} ${props.size} || 'default'} ${props.inverse && 'button--inverse'} ${props.danger && 'button--danger'}`}
			type = {props.type}
			onClick = {props.onClick}
			disabled = {props.disabled}
		>
			{props.children}
		</button>
	)
}

export default Button;