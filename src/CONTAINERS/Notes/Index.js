import React, {useEffect, useCallback} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { get_notes, delete_note } from '../../REDUX_STORE/ACTIONS/NoteAction'

import PulseLoader from "react-spinners/PulseLoader"
import { MdDeleteForever, MdModeEdit } from "react-icons/md";
import { Container, Row, Col, Modal, OverlayTrigger, Tooltip } from 'react-bootstrap'

import { FaRegWindowClose, FaShareSquare, FaUserPlus } from "react-icons/fa";

// ui
import Card from '../../UI/Card'
import Button from '../../UI/Button'
import noteCss from '../../CSS/Note.module.css'

import User from '../Auth/User'

import { css } from "@emotion/core";

const Notes = (props) => {

	const [show, setPulse] = React.useState(false)
	
	const [modalShow, setModalShow] = React.useState(false);
	const [showNote, setNote] = React.useState({})
	const [sharedNote, setSharedNote] = React.useState(false)
	const [error, setError] = React.useState()

	const dispatch = useDispatch()
	
	const getNotes = useCallback(async() => {
		try {
			await dispatch(get_notes())
		}catch(error){
			console.log('Error is coming', error)
			setError(error.message)
		}
	}, [dispatch, get_notes, setError])

	useEffect(() => {
		setPulse(true)
		getNotes() 
		setTimeout(() => {
			setPulse(false)
		}, 1000)
	}, [dispatch, getNotes])

	const override = css`
			display: block;
			text-align: center;
		`
	const notes = useSelector(state => state.notes)
	
	console.log("allshared notes", notes.shared_notes)
	
	if(modalShow){
		return (
		<Modal
			show={modalShow}
			size="lg"
			// "aria-labelledby"="contained-modal-title-vcenter"
			centered
		>

			<Modal.Header>
				<Modal.Title id="contained-modal-title-vcenter">
				  {showNote.name}
				</Modal.Title>
			</Modal.Header>

			<Modal.Body>
				<p>
				  {showNote.description}
				</p>
			</Modal.Body>
			
			<Modal.Footer className = {noteCss.actions}>
				{!sharedNote &&	(
					<OverlayTrigger
					placement="right"
					delay={{ show: 250, hide: 400 }}
					overlay={<Tooltip id="button-tooltip-2">Edit Note</Tooltip>}
					>
					<MdModeEdit 
          				style = {{cursor: 'pointer', margin: "10px"}} 
          				size = "25px" 
          				color = "green"
          				onClick = {() => props.history.push(`/notes/edit/${showNote.id}`)}
        			/>
					</OverlayTrigger>

        		)}

        		
				{sharedNote &&	(
				<>
				<OverlayTrigger
					placement="right"
					delay={{ show: 250, hide: 400 }}
					overlay={<Tooltip id="button-tooltip-2">Contributors</Tooltip>}
				>
				<FaUserPlus
					style = {{cursor: 'pointer', margin: "10px" }} 
					size = "25px" 
					color = "blue" 
					onClick = {() => props.history.push(`/notes/${showNote.id}/collabrators`)}

				/>
				</OverlayTrigger>

				<OverlayTrigger
					placement="right"
					delay={{ show: 250, hide: 400 }}
					overlay={<Tooltip id="button-tooltip-2">Share</Tooltip>}
				>
				<FaShareSquare
					style = {{cursor: 'pointer', margin: "10px" }} 
                    size = "25px" 
                    color = "blue" 
                    onClick = {() =>  props.history.push(`/users/${showNote.id}`)}

				/>
				</OverlayTrigger>

				</>
				)
			}
			
			<OverlayTrigger
				placement="right"
				delay={{ show: 250, hide: 400 }}
				overlay={<Tooltip id="button-tooltip-2">Close</Tooltip>}
			>
			<FaRegWindowClose  
				style = {{cursor: 'pointer', margin: "10px" }} 
                size = "25px" 
                color = "blue" 
                onClick = {() => setModalShow(false)}
            />
			</OverlayTrigger>
			
			</Modal.Footer>
		</Modal>
		)
	}

	return (
		<div className = {noteCss.Main}>
			<div className = {noteCss.Notes}>
				<Row>
					<Col md = {{span: 9, offset: 1}} xs = {{span: 9, offset: 1}}>
						<div>{error && <h3>{error}</h3>}</div>
					</Col>

					<Col md = {{span: 3, offset: 9}} xs = {{span: 5, offset: 7}}>
						<Button onClick = {() => props.history.push('/notes/new')}>
							+ Add Note
						</Button>
					</Col>
					<Col xs = {{span: 6, offset: 2}}>
						{show && <PulseLoader color="#ff0055" loading={show} size={15} css={override}/>}
					</Col>
				</Row>

		    	<Row>
					{
						!show && notes.notes.length > 0 ? (notes.notes.map(note =>
						<Col key = {note.id} xs = {12} sm = {8} md = {6} lg = {4}>
							<Card  cardStyles = {noteCss.Card}>
								<div className = {noteCss.metainfo}>
									<p><b>{note.name.toUpperCase()[0]+note.name.slice(1)}</b></p>
									<p>{note.description.slice(0,300)}</p>
									

									<div className = {noteCss.actions}>
										<MdModeEdit 
			                      			style = {{cursor: 'pointer', margin: "10px"}} 
			                      			size = "25px" 
			                      			color = "green"
			                      			onClick = {() => props.history.push(`/notes/edit/${note.id}`)}
			                    		/>
			                    		<MdDeleteForever 
						                    style = {{cursor: 'pointer', margin: "10px" }} 
						                    size = "25px" 
						                    color = "red" 
						                    onClick = {() => dispatch(delete_note(note.id))}
						                />
										<div onClick={() => {
												setModalShow(true)
												setNote(note)
												setSharedNote(true)
											}
										}>
											<b href = "#" style = {{cursor: 'pointer'}}>Read more</b>
										</div>
									</div>
								</div>
							</Card>
						</Col>
						)) : (!error && !show && notes.notes.length === 0 && <Col xs = {12} sm = {12} md = {12} lg = {12}><h3>You do not have any notes...!</h3></Col>)
					}
				</Row>
			</div>
			<div className = {noteCss.SharedNotes}>
				<h5>* Shared Notes *</h5>
				{
						(!show && notes.shared_notes && notes.shared_notes.length > 0) ? 
						(notes.shared_notes.map((sharednote, index) => 
										<div onClick={() => {
												setModalShow(true)
												setNote(sharednote)
											}
										}>
											<strong style = {{cursor: 'pointer', color: 'blue'}}>{index + 1}. {sharednote.name}</strong>
										</div>)) : <p>No body have shared notes to you!!!</p>

				}
			</div>
		</div>
	)
}

export default Notes;