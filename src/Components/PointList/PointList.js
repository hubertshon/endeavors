import React, { useContext, useEffect, useState, useRef } from "react";
import './PointList.css';
import { Point } from "../Point/Point";
import { PointFull } from "../PointFull/PointFull";
import { PointsContext } from "../../Context/PointsContext";
import { useParams } from "react-router-dom";
import * as Icon from "react-feather";
import { PointEditModal } from "../PointEditModal/PointEditModal";
import Modal from 'react-bootstrap/Modal';


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

    const handleChange = (e, pointId) => {
        console.log('EDIT', e);
        console.log('ID', pointId);
        const newPoints = [...pointsList];
        const editingPoint = newPoints.find((point) => {
            return point.id == pointId; 
        });
        editingPoint[e.target.id] = e.target.value;
        console.log('EDIT', editingPoint);
        setPointsList(newPoints); 
    }

    return (
        <>
        {showFullPoint ? 
        <div className="container" data-testid="container">
        <PointFull 
            point={selectedPoint} 
            handleClose={() => setShowFullPoint(false)}
            onChange={(e, val) => handleChange(e, val)}
            />
            </div>
        : 
        <>
        <div id="pointlist" className="container" data-testid="container" style={{ overflowY: "scroll", maxHeight: "70vh"}}>
            {pointsList !== null ? pointsList.map((point, index) => {
                return <Point 
                    key={point.id} 
                    point={point}
                    handleEdit={() => editPoint(point)}
                    handleRemove={() => removePoint(point.id)}
                    handlePointClick={() => displayPoint(point)}
                    
                />
            }) : null }
            
        </div>
        <div
        className="newPoint-btn"
        onClick={(e) => {
            setPointsList(
                [...pointsList, 
                {
                    id: 999, 
                    name: "New Point", 
                    location: "New Point Location",
                    text: ""
                }
            ]);
            setSelectedPoint(
                {
                    id: 999, 
                    name: "New Point", 
                    location: "New Point Location",
                    text: ""
                }
            );
        }
        }
        >
            <span>ADD NEW POINT</span>
            <Icon.PlusCircle size="24" />
        </div>
        </>
        }

        <Modal className="point-modal" show={show} size="lg" onHide={handleClose} variant="dark">
            <PointEditModal onChangeValue={(e) => changeValue(e)} point={selectedPoint}/>
        </Modal>

    </>
    )


}
