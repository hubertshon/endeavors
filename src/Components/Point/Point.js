import React from "react";
import "./Point.css";
import Container from 'react-bootstrap/Container';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import * as Icon from 'react-feather';


export const Point = (props) => {

    return (
        <Container className="point-container">
            <div className="innerContainer">
                <Row>
                    <Col className="d-flex justify-content-left">
                        <h5 className="point-title">{props.point.name}</h5>
                    </Col>
                    <Col>
                    <div className="button-dock">
                        <button className="btn btn-sm btn-link-light"
                        onClick={() => props.handlePointClick()}
                        ><Icon.Maximize2 size="16" /></button>
                        {/* <button className="btn btn-sm btn-link-light"
                            onClick={() => props.handlePointClick()}
                        >
                            <Icon.PenTool size="16" /></button> */}
                        <button className="btn btn-sm btn-link-light"
                            onClick={() => props.handleRemove()}
                        >
                            <Icon.Trash size="16" />
                        </button>
                    </div>
                    </Col>
                </Row>
                <Row>
                    <Col className="d-flex justify-content-left">
                        <p className="date-location">01.12.2021 - {props.point.location}</p>
                    </Col>
                </Row>
                <Row>
                    <p style={{textAlign: "left"}}>{props.point.text}</p>
                </Row>
            </div>
        </Container>
    )
}
