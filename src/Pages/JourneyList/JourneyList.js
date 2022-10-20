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

        //SEND POST REQUEST
    }

    const editJourney = (editJourney) => {
        setJourneysList(prevState => ({
            journeys: prevState.journeys.map(
                journey => journey.id === editJourney.id ? editJourney : journey)
        }));
            
        //SEND PATCH REQUEST
        handleClose();
    }

    const deleteJourney = (deleteJourneyId) => {
        const newJourneysList = journeysList.journeys.filter((journey) => {
            return journey.id !== deleteJourneyId
        });

        setJourneysList({
            journeys: newJourneysList
        });

        //SEND DELETE REQUEST
        handleClose();
    }

    const [show, setShow] = useState(false);
    const [deleteShow, setDeleteShow] = useState(false);
    const handleClose = () => {setShow(false); setDeleteShow(false)};
    const handleShow = () => setShow(true);

    return (
        <>
        <Container className="list-container">
            {/* <Row xs={12}> */}

                <Row className="d-flex mb-5 justify-content-between">
                    <Col xs={9} lg={10} xl={11} className="d-flex justify-content-left">
                        <input className="journey-searchBar" id="journeySearchInput" type="text" placeholder="Search..." />
                    </Col>
                    <Col className="d-flex justify-content-end" xs={3} lg={1}>
                        <button 
                            className="btn btn-outline-light align-items-center justify-content-between d-flex" 
                            style={{ border: "0.5px solid #e5e5e5", width: '5rem'}}
                            onClick={() => addNewJourney()}
                            >New <Icon.Edit size={14} />
                        </button>
                    </Col>
                </Row>

                <Row className="mb-3">
                    <Col xs={2} className="image-column"></Col>
                    <Col className="d-flex justify-content-left" xs={8} lg={7}>
                        <span className="list-header">Journey</span>
                    </Col>
                    <Col className="d-flex justify-content-left" xs={3}>
                        <span className="list-header">Date</span>
                    </Col>
                    <Col className="d-flex justify-content-left" xs={1}>
                    </Col>
                </Row>  
                
                {journeysList.journeys.map((journey, index) => {
                    return (  
    
                        <Row className="mb-5">
                            <Col xs={2} className="image-column">
                                <div className="small-image">
                                    <img 
                                        className="journey-image" 
                                        src={require(`../../Assets/images/${journey.image}`)} 
                                        alt="journey_image" 
                                    /> 
                                </div>
                            </Col>
                            <Col className="d-flex justify-content-center align-items-start flex-column"  xs={8} lg={7}>
                                <Row>
                                <Link 
                                    className="journey-link"
                                    to={`/journey/${journey.id}`}  
                                    state={{ journey: journey }}

                                ><span className="journey-title">{journey.name}</span>
                                </Link>
                                </Row>
                                <Row>
                                    <p>{journey.summary}</p>
                                </Row>
                            </Col>
                                
                            <Col className="d-flex justify-content-left align-items-center" xs={3} lg={2}>
                                <span>{journey.date}</span>
                            </Col>
                                

                            <Col className="d-flex align-items-center justify-content-center" xs={1}>
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
            {/* </Row> */}
            
        </Container>

        <Modal className="point-modal" show={show} size="lg" onHide={handleClose} variant="dark">
            <JourneyEditModal 
            journey={selectJourney} 
            handleClose={() => handleClose()}
            handleSubmit={(e) => editJourney(e)}
            />
        </Modal>

        <Modal className="delete-modal" show={deleteShow} size="md" onHide={handleClose} variant="dark">
            <DeleteModal 
                subject={"journey"} 
                handleClose={() => handleClose()}
                startDelete={() => deleteJourney(selectJourney.id)}
                />
        </Modal>
        </>
    )
}
