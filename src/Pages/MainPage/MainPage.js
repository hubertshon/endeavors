import React from "react";
import { PointList } from "../../Components/PointList/PointList";
import { Map } from "../../Components/Map/Map";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export const MainPage = (props) => {


    return (
        <Container className="p-2">
            <Row>
                <Col><PointList /></Col>
                <Col><Map /></Col>
            </Row>
        </Container>
    )
}
