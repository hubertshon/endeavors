import React from "react";
import './JourneyPage.css';
import { PointList } from "../../Components/PointList/PointList";
import { Map } from "../../Components/Map/Map";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export const Journey = (props) => {


    return (
        <Container className="p-2">
            <h5 className="journey-header mt-2 mb-4">JOURNEY</h5>
            <Row>
                <Col><PointList /></Col>
                <Col><Map /></Col>
            </Row>
        </Container>
    )
}
