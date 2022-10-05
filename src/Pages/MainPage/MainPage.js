import React, { useState } from "react";
import { PointList } from "../../Components/PointList/PointList";
import { Map } from "../../Components/Map/Map";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export const MainPage = () => {

    const samplePoints = [
        {
            name: "Point One",
            location: "Location One"
        },
        {
            name: "Point One",
            location: "Location One"
        },
        {
            name: "Point Three",
            location: "Location Three"
        },

    ];
    const [pointList, setPointList] = useState(samplePoints);

    return (
        <Container className="p-2">
            <Row>
                <Col><PointList pointList={pointList} /></Col>
                <Col><Map /></Col>
            </Row>
        </Container>
    )
}
