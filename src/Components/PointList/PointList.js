import React, { useContext, useState } from "react";
import './PointList.css';
import { Point } from "../Point/Point";
import { PointFull } from "../PointFull/PointFull";
import { PointsContext } from "../../Context/PointsContext";
import { useParams } from "react-router-dom";
import * as Icon from "react-feather";
import Modal from 'react-bootstrap/Modal';
import { DeleteModal } from "../DeleteModal/DeleteModal";



export const PointList = (props) => {

    const { journeyId } = useParams();
    const  {journeysList, setJourneysList} = useContext(PointsContext);

    const findJourney = (id) => {
        const selectJourney = journeysList.journeys.find((journey) => {
            return journey.id == id
        });
        return selectJourney.points
    }


    //STATES DIVERGE HERE ??
    const [pointsList, setPointsList] = useState(findJourney(journeyId));
    const [selectedPoint, setSelectedPoint] = useState({});


    const addPoint = () => {
        const getJourney = journeysList.journeys.find(journey => journey.id == journeyId ? {...journey} : null); 
        console.log('getJourney/', getJourney);
        getJourney.points.push(exampleNewPoint);
        
        setJourneysList(prevState => ({
            journeys: prevState.journeys.map(
                journey => journey.id === getJourney.id ? getJourney : journey)
        }));
       
        //SEND POST REQUEST 
    }

    const handleChange = (e, pointId) => {
        // Change should only happen once user clicks OUT. 
        const newPoints = [...pointsList];
        const editingPoint = newPoints.find((point) => {
            return point.id == pointId; 
        });
        editingPoint[e.target.id] = e.target.value;
        setPointsList(newPoints); 

        //SEND PATCH REQUEST 
    }

    const removePoint = (pointId) => {
        setPointsList((pointsList) => {
            const newList = pointsList.filter((item, j) => {
                return item.id !== pointId
            });
            return newList;
        });

        setShowFullPoint(false);
        handleDeleteClose(false);

        //SEND DELETE REQUEST
    }


    // Point Expand 
    const [showFullPoint, setShowFullPoint] = useState(false);

    // Modal Functions
    const [show, setShow] = useState(false);
    const handleDeleteClose = () => setDeleteShow(false);
    const handleShow = () => setShow(true);
    const [deleteShow, setDeleteShow] = useState(false);


    const editPoint = (point) => {
        setSelectedPoint(point);
        //SEND PATCH REQUEST 
    }
    
    const displayPoint = (e, point) =>{ 
        if (e.target?.tagName.toLowerCase() === 'div') {
            setSelectedPoint(point);
            setShowFullPoint(true);
            props.handlePointSelect(point); 
        }
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
        text: "Enter a new description...",
        img: '',
        loc: {
            id: 999,
            lat: null,
            lng: null
            
        }
    }

    return (
        <>
        <div id="pointlist" style={{overflowY: "scroll",
        maxHeight: "70vh"}}>
        {showFullPoint ? 
        <div className="container" data-testid="container">
        <PointFull 
            point={selectedPoint} 
            handleClose={() => setShowFullPoint(false)}
            onChange={(e, val) => handleChange(e, val)}
            showDeleteModal={() => setDeleteShow(true)}
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
                    handlePointClick={(e) => displayPoint(e, point)}
                    handleDelete={() => setDeleteShow(true)}
                    pointHover={(e) => pointHover(e, point)}          
                />
            }) : null }
            
        </div>
        <div
        className="newPoint-btn"
        onClick={(e) => {
            addPoint();
            setSelectedPoint(exampleNewPoint);
            }
        }
        >
            <span>ADD NEW POINT</span>
            <Icon.PlusCircle size="24" />
        </div>
        </>
        }

    </div>

    <Modal className="delete-modal" show={deleteShow} size="md" onHide={handleDeleteClose} variant="dark">
        <DeleteModal 
            subject="point" 
            handleClose={() => handleDeleteClose()}
            startDelete={() => removePoint(selectedPoint.id)}
            />
    </Modal>
    </>
    )


}
