import React, { useContext, useEffect, useState } from "react";
import './PointList.css';
import { Point } from "../Point/Point";
import { PointFull } from "../PointFull/PointFull";
import { PointsContext } from "../../Context/PointsContext";
import { useParams } from "react-router-dom";
import * as Icon from "react-feather";
import Modal from 'react-bootstrap/Modal';
import { DeleteModal } from "../DeleteModal/DeleteModal";
import useWindowDimensions from "../../Hooks/WindowHook";



export const PointList = (props) => {

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
    const [mobileView, setMobileView] = useState(true);
    const [mobileIndex, setMobileIndex] = useState(0);
    const { height, width } = useWindowDimensions();

 
    useEffect(() => {
        props.handlePointSelect(selectedPoint);
        props.handlePointHover(pointsList[mobileIndex])

        if (width < 992) {
            setMobileView(true);
        } else {
            setMobileView(false);
        }

    }, [selectedPoint, width]);

    useEffect(() => {
        props.handlePointHover(pointsList[mobileIndex]);
    }, [mobileIndex]);


    const addPoint = () => {
        const getJourney = journeysList.journeys.find(journey => journey.id == journeyId ? {...journey} : null); 
        getJourney.points.push(exampleNewPoint);
        
        setJourneysList(prevState => ({
            journeys: prevState.journeys.map(
                journey => journey.id === getJourney.id ? getJourney : journey)
        }));
       
        //SEND POST REQUEST 
    }

    const addPointProcess = async () => {
        addPoint();
        setShowFullPoint(true);
        setSelectedPoint(pointsList[pointsList.length -1]);
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
        //This first point will only handle the PointList component
        setPointsList((pointsList) => {
            const newList = pointsList.filter((item, j) => {
                return item.id !== pointId
            });
            return newList;
        });

        const newPointsList = pointsList.filter((item, j) => {
            return item.id !== pointId
        });

        setJourneysList(prevState => ({
            ...prevState,
            journeys: prevState.journeys.map((journey) => {
                if (journey.id == journeyId) {
                    journey.points = newPointsList
                }
                return journey
            })
        }));

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

    const handleMobileClick = (iterate) => {
        let newIndex = 0;
        if (mobileIndex + iterate >= pointsList.length) {
            newIndex = 0;
        } else if (mobileIndex + iterate < 0) {
            newIndex = pointsList.length - 1;
        } else {
            newIndex = mobileIndex + iterate;
        }
        setMobileIndex(newIndex);
    }

    return (
        <>
        { mobileView ? 
        
        <div className="d-flex align-content-center pointListMobile mb-4">
 
            {showFullPoint ? 
            <PointFull 
                point={selectedPoint} 
                handleClose={() => setShowFullPoint(false)}
                onChange={(e, val) => handleChange(e, val)}
                showDeleteModal={() => setDeleteShow(true)}
                />
            :
            <Point key={pointsList[mobileIndex].id} 
                point={pointsList[mobileIndex]}
                handleEdit={() => editPoint(pointsList[mobileIndex])}
                handlePointClick={(e) => displayPoint(e, pointsList[mobileIndex])}
                handleDelete={() => setDeleteShow(true)}
                pointHover={() => {}}
                mobileView={mobileView}
                mobileClick={(e) => handleMobileClick(e)}          
            />

            }
        </div>
        
        :
        <div 
            id="pointlist" 
            style={{overflowY: "scroll", maxHeight: "70vh"}}>
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
                addPointProcess();
                }
            }
            >
                <span>ADD NEW POINT</span>
                <Icon.PlusCircle size="24" />
            </div>
        </>
        }

        </div>
        }
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
