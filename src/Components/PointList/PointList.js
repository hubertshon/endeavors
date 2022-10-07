import React, { useContext, useEffect, useState, useRef } from "react";
import './PointList.css';
import { Point } from "../Point/Point";
import { PointFull } from "../PointFull/PointFull";
import { PointsContext } from "../../Context/PointsContext";
import { useParams } from "react-router-dom";
import * as Icon from "react-feather";
import { PointEditModal } from "../PointEditModal/PointEditModal";
import Modal from 'react-bootstrap/Modal';
// import Button from 'react-bootstrap/Button';
// import { useParams } from "react-router-dom";


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
    const [selectedPoint, setSelectedPoint] = useState({});


    const removePoint = (pointId) => {
        setPointsList((pointsList) => {
            const newList = pointsList.filter((item, j) => {
                return item.id !== pointId
            });
            return newList;
        });
    }


    // Point Expand 
    const [showFullPoint, setShowFullPoint] = useState(false);

    // Modal Functions
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => {setShow(true); console.log('showing');};

    // const refOne = useRef(false);


    const changeValue = (thing) => {
        console.log(thing);
    }

    const selectPoint = (e) => { 
        if (e) {
            console.log('not null', e);
        } else {
            setSelectedPoint({
                point: {
                    id: 997, 
                    name: "New Point", 
                    location: "New Point Location"
                }
            }); 
        }
    }

    const editPoint = (point) => {
        setSelectedPoint(point);
        handleShow();
    }
    
    const displayPoint = (point) =>{ 
        setSelectedPoint(point);
        setShowFullPoint(true);
    }


    return (
        <>
        {showFullPoint ? 
        <div className="container" data-testid="container">
        <PointFull 
            point={selectedPoint} 
            handleClose={() => setShowFullPoint(false)}
            />
            </div>
        : 
        <div className="container" data-testid="container">
            {pointsList !== null ? pointsList.map((point, index) => {
                return <Point 
                    key={point.id} 
                    point={point}
                    handleEdit={() => editPoint(point)}
                    handleRemove={() => removePoint(point.id)}
                    handlePointClick={() => displayPoint(point)}
                    
                />
            }) : null }
            <div
                className="newPoint-btn"
                onClick={(e) => {
                    setPointsList(
                        [...pointsList, 
                        {
                            id: 999, 
                            name: "New Point", 
                            location: "New Point Location"
                        }
                    ]);
                    setSelectedPoint(
                        {
                            id: 999, 
                            name: "New Point", 
                            location: "New Point Location"
                        }
                    );
                    handleShow()}
                }
                >
                    <span>ADD NEW POINT</span>
                    <Icon.PlusCircle size="24" />
            </div>
        </div>
        }

        <Modal className="point-modal" show={show} size="lg" onHide={handleClose} variant="dark">
            <PointEditModal onChangeValue={(e) => changeValue(e)} point={selectedPoint}/>
        </Modal>

    </>
    )


}
