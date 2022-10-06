import React from "react";
import './JourneyPage.css';
import { PointList } from "../../Components/PointList/PointList";
import { Map } from "../../Components/Map/Map";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export const Journey = (props) => {


    return (
        <Container className="d-flex flex-column p-2">
            <div className="d-flex journey-header">
                <h5 className="header-title mb-4 mx-4">JOURNEY</h5>
                <h5 className="header-date mx-4">3.19 - 3.31.2021</h5>
            </div>
            <Row>
                <Col><PointList /></Col>
                <Col><Map /></Col>
            </Row>
        </Container>
    )
}
