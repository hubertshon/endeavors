import React, { useContext, useState } from "react";
import './PointList.css';
import { Point } from "../Point/Point";
import { PointFull } from "../PointFull/PointFull";
import { PointsContext } from "../../Context/PointsContext";
import { useParams } from "react-router-dom";
import * as Icon from "react-feather";
import { PointEditModal } from "../PointEditModal/PointEditModal";
import Modal from 'react-bootstrap/Modal';



export const PointList = (props) => {

    const { journeyId } = useParams();
    const  {journeysList, setJourneysList} = useContext(PointsContext);

    const findJourney = (id) => {
        const selectJourney = journeysList.journeys.find((journey) => {
            return journey.id == id
        });
        return selectJourney.points
    }


    //STATES DIVERGE HERE 
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
    const handleShow = () => setShow(true);

    // const refOne = useRef(false);

    const selectPoint = (e) => { 
        if (e) {
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
        // handleShow();
    }
    
    const displayPoint = (point) =>{ 
        setSelectedPoint(point);
        setShowFullPoint(true);
        props.handlePointSelect(point);
    }

    const handleChange = (e, pointId) => {
        const newPoints = [...pointsList];
        const editingPoint = newPoints.find((point) => {
            return point.id == pointId; 
        });
        editingPoint[e.target.id] = e.target.value;
        setPointsList(newPoints); 
    }

    const pointHover = (e, point) => {
        if (e._reactName === 'onMouseEnter') {
            props.handlePointHover(point);
        } else {
            props.handlePointHover(null);
        }
    }

    const exampleNewPoint = {
        id: 999, 
        name: "New Point", 
        location: "New Point Location",
        text: "",
        loc: {
            id: 999,
            lat: null,
            lng: null
            
        }
    }

    return (
        <div id="pointlist" style={{overflowY: "scroll",
        maxHeight: "70vh"}}>
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
        <div className="container" data-testid="container" >
            {pointsList !== null ? pointsList.map((point, index) => {
                return <Point 
                    key={point.id} 
                    point={point}
                    handleEdit={() => editPoint(point)}
                    handleRemove={() => removePoint(point.id)}
                    handlePointClick={() => displayPoint(point)}
                    pointHover={(e) => pointHover(e, point)}          
                />
            }) : null }
            
        </div>
        <div
        className="newPoint-btn"
        onClick={(e) => {
            setPointsList([...pointsList, exampleNewPoint]);
            setSelectedPoint(exampleNewPoint);
            }
        }
        >
            <span>ADD NEW POINT</span>
            <Icon.PlusCircle size="24" />
        </div>
        </>
        }

        {/* <Modal className="point-modal" show={show} size="lg" onHide={handleClose} variant="dark">
            <PointEditModal onChangeValue={(e) => changeValue(e)} point={selectedPoint} />
        </Modal> */}

    </div>
    )


}
