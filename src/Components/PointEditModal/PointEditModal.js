import React, { useEffect, useState, useRef } from 'react';
import './PointEditModal.css';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { MyEditor } from '../Editor/Editor';


export const PointEditModal = (props) => {

    // const [show, setShow] = useState(false);

    let modalInputs = {
        pointName: false,
        pointLocation: false
    }

    const [modalState, setModalState] = useState(modalInputs);
    const refOne = useRef(false);

    const handleInputClick = (e) => {
        setModalState({
                ...modalState,
                [e.target.id]: true
            });
    }

    useEffect(() => {
        document.addEventListener("click", handleClickOutside, true);
        console.log('modalState', modalState);
    }, []);

    const handleClickOutside = (e) => {
        if (!refOne.current.contains(e.target)) {
            setModalState({
                ...modalState,
                [e.target.id]: !modalState[e.target.id]
            });
        } 
    }

    console.log('props point', props.point);
    return (
        <>
        <form>
            <Modal.Header closeButton>
                <Modal.Title className="point-title">   
                    {modalState.pointName ? 
                        <input name="pointName" id="pointNameInput" type="text" ref={refOne} value={props.point.name} onChange={() => {}} /> 
                        : 
                        <span 
                            ref={refOne} 
                            id="pointName" 
                            onClick={(e) => handleInputClick(e) }
                            >
                            {props.point.name}
                        </span> 
                    }
                </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="mb-4">
                        <span>Location: </span>
                        {modalState.pointLocation ? 
                            <input name="pointLocation" type="text" ref={refOne} value={props.point.location} onChange={() => {}} /> 
                            : 
                            <span 
                                ref={refOne} 
                                id="pointLocation" 
                                onClick={(e) => handleInputClick(e) }
                                >
                                {props.point.location}
                            </span> 
                        }
                    </div>
                    {/* <div> */}
                        <MyEditor />
                    {/* </div> */}
                    </Modal.Body>
        
            <Modal.Footer align="left">
                <label>Date</label>
                <input name="Location" type="text"></input>
                {/* <Button variant="outline-light" onClick={handleClose}>
                    Close
                </Button> */}
                {/* <Button variant="outline-light" onClick={handleClose}>
                    Save Changes
                </Button> */}
            </Modal.Footer>
            </form>
        </>
    )
}
