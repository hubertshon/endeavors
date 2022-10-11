import React, { useState } from 'react';
import './JourneyEditModal.css';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';



export const JourneyEditModal = (props) => {

    const [editJourney, setEditJourney] = useState(props.journey);

    const handleChange = (e) => {
        setEditJourney({
            ...editJourney,
            [e.target.id]: e.target.value
        })
    }

    return (
        <>
            <Modal.Header closeButton>
                <Modal.Title className="point-title">
                        Edit Journey             
                </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="journey-form d-flex flex-column">
                        <label>Name</label>   
                        <input 
                            name="pointName" 
                            id="name" 
                            type="text" 
                            defaultValue={props.journey.name} 
                            onChange={(e) => {handleChange(e)}} 
                            />  

                        <label>Summary</label>   
                        <textarea 
                        name="pointSummary" 
                        id="summary" 
                        type="text" 
                        defaultValue={props.journey.summary} 
                        onChange={(e) => {handleChange(e)}} 
                        spellCheck="false"
                        rows="3"
                        /> 

                        <label>Photo</label>   
                        <div className="d-flex flex-row align-items-center justify-content-evenly mt-4 w-75">
                            {props.journey.image ? <img className="thumbnail" src={require(`../../Assets/images/${props.journey.image}`)} alt="journey_image" /> 
                            : 
                            <span>No Image</span>}
                            <span className="d-flex ml-4">{props.journey.image}</span>
                        </div>   
                    </form> 
                    </Modal.Body>
        
            <Modal.Footer align="left">
                <Button variant="outline-light" onClick={props.handleClose}>
                    Close
                </Button>
                <Button variant="outline-light" onClick={() => props.handleSubmit(editJourney)}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </>
    )
}
