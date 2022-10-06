import React, { useContext } from "react";
import "./Point.css";
import Container from 'react-bootstrap/Container';
// import { PointsContext } from "../../Context/PointsContext";

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import * as Icon from 'react-feather';


export const Point = (props) => {

    // const {pointsList, setPointsList} = useContext(PointsContext);

    return (
        <Container className="point-container">
            <Row>
                <Col className="d-flex justify-content-left">
                    <h5 className="point-title">{props.name}</h5>
                </Col>
                <Col>
                <div className="button-dock">
                    <button className="btn btn-sm btn-link-light">
                        <Icon.PenTool size="16" /></button>
                    <button className="btn btn-sm btn-link-light"
                        onClick={() => props.handleRemove()}
                    >
                        <Icon.X size="16" />
                    </button>
                </div>
                </Col>
            </Row>
            <Row>
                <Col className="d-flex justify-content-left">
                    <p>{props.location}</p>
                </Col>
            </Row>
        </Container>
    )
}
