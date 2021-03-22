import React from 'react'

import classes from '../CSS/Card.module.css'

const Card = (props) => {
	return (
		<div className = {`${classes.Card} ${props.cardStyles}`}  style = {props.style}>
			{props.children}
		</div>
	)
}

export default Card;