import React, { useContext } from 'react';
import './JourneyList.css';
import { Container, Row, Col } from 'react-bootstrap';
import { PointsContext } from "../../Context/PointsContext";
import { Link } from 'react-router-dom';

import * as Icon  from 'react-feather';


export const JourneyList = () => {

    const {journeysList, setJourneysList} = useContext(PointsContext);

    const addNewJourney = () => {
        setJourneysList({ journeys: [
            ...journeysList.journeys, 
            {
                name: "New Journey", 
                location: "New", 
                description: "This is a new Journey"
            }                                       
        ]});
    }

    return (
        <Container className="list-container">
            <Col xs={8}>
                <div className="d-flex mb-4 justify-content-left">
                    <button className="btn btn-light align-items-center"
                    onClick={() => addNewJourney()}
                    >New Journey <Icon.Edit size="14" /></button>
                    
                </div>
                <div className="journey-list">
                <Row className="mb-3">
                    <Col className="d-flex justify-content-left" xs={4}>
                        <span className="list-header">Name</span>
                    </Col>
                    <Col className="d-flex justify-content-left">
                        <span className="list-header">Location</span>
                    </Col>
                    <Col className="d-flex justify-content-left" xs={6}>
                        <span className="list-header">Description</span>
                    </Col>
                </Row>  
                {journeysList.journeys.map((journey, index) => {
                    return (  
                        <Link to={`/journey/${journey.id}`} state={{ journey: journey }}>
                        <Row key={journey.id} className="mb-3" >
                            <Col className="d-flex justify-content-left" xs={4}>
                                <span className="journey-title">{journey.name}</span>
                            </Col>
                            <Col className="d-flex justify-content-left">
                                <span>{journey.location}</span>
                            </Col>
                            <Col className="d-flex justify-content-left" xs={6}>
                                <span>{journey.description}</span>
                            </Col>
                        </Row>    
                        </Link>
                    )
                })}
                </div>
            </Col>
            <Col>
            <div className="small-map">

            </div>
            </Col>
        </Container>
    )
}
