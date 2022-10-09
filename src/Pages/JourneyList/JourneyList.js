import React, { useContext, useState } from 'react';
import './JourneyList.css';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';

import { PointsContext } from "../../Context/PointsContext";
import * as Icon  from 'react-feather';


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

    return (
        <Container className="list-container">

            <Col>
                <div className="small-map">
                {hoverJourney.image ? <img class="journey-image" src={require(`../../Assets/images/${hoverJourney.image}`)} alt="journey_image" /> 
                : 
                null
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
                        <Link 
                            to={`/journey/${journey.id}`} 
                            key={`journey_${index}`} 
                            state={{ journey: journey }}
                            onMouseEnter={() => setHoverJourney(journey) }
                            onMouseLeave={() => setHoverJourney({}) }
                            >
                            <Row className="mb-3">
                                <Col className="d-flex justify-content-left">
                                    <span className="journey-title">{journey.name}</span>
                                </Col>
                                <Col className="d-flex justify-content-left" xs={2}>
                                    <span>{journey.date}</span>
                                </Col>
                                <Col className="d-flex justify-content-center" xs={1}>
                                    {/* <span>{journey.description}</span> */}
                                    <Icon.MoreHorizontal size={18} color="#ececec" />
                                    
                                </Col>
                            </Row>    
                        </Link>
                    )
                })}
                </div>
            </Col>
            
        </Container>
    )
}
