import React, { useContext, useState }from "react";
import './PointList.css';
import { Point } from "../Point/Point";
import { MyEditor } from '../Editor/Editor';
import { PointsContext } from "../../Context/PointsContext";

import * as Icon from "react-feather";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useParams } from "react-router-dom";


export const PointList = () => {

    const { journeyId } = useParams();
    const  {journeysList, setJourneysList} = useContext(PointsContext);


    const findJourney = (id) => {
        const selectJourney = journeysList.journeys.find((journey) => {
            return journey.id == id
        });
        return selectJourney.points
    }
    const [pointsList, setPointsList] = useState(findJourney(journeyId));


    const removePoint = (pointId) => {
        setPointsList((pointsList) => {
            const newList = pointsList.filter((item, j) => {
                return item.id !== pointId
            });
            return newList;
        });
    }

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    return (
        <>
        <div className="container" data-testid="container">
            {pointsList !== null ? pointsList.map((point, index) => {
                return <Point 
                    key={index} 
                    name={point.name} 
                    location={point.location}
                    handleRemove={() => removePoint(point.id)}
                />
            }) : null }
            <button 
                className="btn btn-light"
                onClick={() => {
                    setPointsList(
                        [...pointsList, 
                        {
                            id: 999, 
                            name: "New Point", 
                            location: "New Point Location"
                        }
                    ]);
                    handleShow()}
                }
                ><Icon.Plus size="18" />
            </button>
        </div>


        <Modal className="point-modal" show={show} size="lg" onHide={handleClose} variant="dark">
            <Modal.Header closeButton>
                <Modal.Title className="point-title">Point Two</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <MyEditor />
                    </div>
                    </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-light" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="outline-light" onClick={handleClose}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    </>
    )


}
