import React, { useContext, useState } from 'react';
import './JourneyList.css';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';

import { PointsContext } from "../../Context/PointsContext";
import { Modal } from 'react-bootstrap';
import { JourneyEditModal } from '../../Components/JourneyEditModal/JourneyEditModal';
import { Dropdown } from 'react-bootstrap';
import * as Icon  from 'react-feather';
import { DeleteModal } from '../../Components/DeleteModal/DeleteModal';


export const JourneyList = () => {

    const {journeysList, setJourneysList} = useContext(PointsContext);
    const [hoverJourney, setHoverJourney] = useState({
        id: null,
        name:null,
        summary: null,
        date: null,
        journey: null,
        points: null
    });
    const [selectJourney, setSelectJourney] = useState({});
    

    const addNewJourney = () => {
        setJourneysList({ journeys: [
            ...journeysList.journeys, 
            {
                id: Math.floor(Math.random() * 100) + 1,
                name: "New Journey", 
                date: "03.05.2022", 
                summary: "This is a new Journey",
                points: []
            }                                       
        ]});
    }

    const editJourney = (editJourney) => {
        console.log('editJourney', editJourney);

        const editIndex = journeysList.find((journey) => {
            return journey.id === editJourney.id
        })

        setJourneysList({journeys: [
            ...journeysList.journeys,
            journeysList.journeys[editIndex] = editJourney

        ]})
    }

    const [show, setShow] = useState(false);
    const [deleteShow, setDeleteShow] = useState(false);
    const handleClose = () => {setShow(false); setDeleteShow(false)};
    const handleShow = () => setShow(true);

    return (
        <>
        <Container className="list-container">

            <Col>
                <div className="small-map">
                {hoverJourney.image ? <img className="journey-image" src={require(`../../Assets/images/${hoverJourney.image}`)} alt="journey_image" /> 
                : 
                <span>Select a Journey</span>
                }
                </div>
                <div className="summary">
                    {hoverJourney.summary ? <p>{hoverJourney.summary}</p> : <p>Summary goes here...</p>}
                </div>
            </Col>
            <Col xs={8}>
                <Row className="d-flex mb-4 justify-content-left">
                    <Col xs={6} className="p-0">
                        <input className="journey-searchBar" id="journeySearchInput" type="text" placeholder="Search..." />
                    </Col>
                    <Col className="d-flex justify-content-left">
                        <button className="btn btn-outline-light align-items-center" style={{ border: "0.5px solid #e5e5e5"}}
                    onClick={() => addNewJourney()}
                    >New Journey <Icon.Edit size="14" /></button>
                    </Col>
                </Row>
                <div className="journey-list">
                <Row className="mb-3">
                    <Col className="d-flex justify-content-left">
                        <span className="list-header">Name</span>
                    </Col>
                    <Col className="d-flex justify-content-left" xs={2}>
                        <span className="list-header">Date</span>
                    </Col>
                    <Col className="d-flex justify-content-left" xs={1}>
                        {/* <span className="list-header">Actions</span> */}
                    </Col>
                </Row>  
                {journeysList.journeys.map((journey, index) => {
                    return (  
                            <Row className="mb-3 journey-row" key={`journey_${index}`}>
                                
                                <Col className="d-flex justify-content-left align-items-center">
                                <Link 
                                    to={`/journey/${journey.id}`}  
                                    state={{ journey: journey }}
                                    onMouseEnter={() => setHoverJourney(journey) }
                                    onMouseLeave={() => setHoverJourney({}) }
                                ><span className="journey-title">{journey.name}</span>
                                </Link>
                                </Col>
                                
                                <Col className="d-flex justify-content-left align-items-center" xs={2}>
                                    <span>{journey.date}</span>
                                </Col>
                                

                                <Col className="d-flex justify-content-center" xs={1}>
                                    {/* <span>{journey.description}</span> */}
                                    <Dropdown>

                                    <Dropdown.Toggle>
                                        <Icon.MoreHorizontal size={18} color="#ececec" />
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu variant="dark">
                                        <Dropdown.Item 
                                            onClick={() => {
                                                setShow(true); 
                                                setSelectJourney(journey)}}
                                            props={selectJourney}
                                        >Edit
                                    </Dropdown.Item>
                                        <Dropdown.Item href="#/action-2" 
                                            onClick={() => {
                                                setDeleteShow(true); 
                                                setSelectJourney(journey)}}
                                        >Delete
                                    </Dropdown.Item>
                                    </Dropdown.Menu>
                                    </Dropdown>
                                </Col>
                            </Row>    
                    )
                })}
                </div>
            </Col>
            
        </Container>

        <Modal className="point-modal" show={show} size="lg" onHide={handleClose} variant="dark">
            <JourneyEditModal 
            journey={selectJourney} 
            handleClose={() => handleClose()}
            handleSubmit={(e) => editJourney(e)}
            />
        </Modal>

        <Modal className="delete-modal" show={deleteShow} size="md" onHide={handleClose} variant="dark">
            <DeleteModal subject={"journey"} />
        </Modal>
        </>
    )
}
