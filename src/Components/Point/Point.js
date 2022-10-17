import React from "react";
import "./Point.css";
import Container from 'react-bootstrap/Container';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import * as Icon from 'react-feather';


export const Point = (props) => {

    const pointStyle = props.point.img ? { height: 'unset'} : { height: "11rem" };

    return (
        <>
        {props.mobileView ? <button 
            className="point-direction-btn btn-left" 
            onClick={() => props.mobileClick(-1)}
            >
            <Icon.ChevronLeft size={16} />
        </button> : null} 
        <Container 
            className={props.mobileView ? "point-mobile-container" : "point-container"}
            onClick={(e) => props.handlePointClick(e)}
            onMouseEnter={(e) => props.pointHover(e)}
            onMouseLeave={(e) => props.pointHover(e)}
            style={pointStyle}
            >
            <div className="innerContainer">  
                <Row>
                    <Col className="d-flex justify-content-left" xs={9}>
                        <h5 className="point-title">{props.point.name}</h5>
                    </Col>
                    <Col>
                    <div className="button-dock">
                        <button className="btn btn-sm btn-link-light"
                            onClick={() => props.handleDelete()}
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
                {props.point.img.length > 0 ? <Row className="mb-2">
                    <img src={require(`../../Assets/images/${props.point.img}`)} alt="image1" />
                </Row> 
                : 
                <Row>
                    <p style={{textAlign: "left"}}>{props.point.text}</p>
                </Row>}
                
            </div>
        </Container>
        {props.mobileView ? <button 
            className="point-direction-btn btn-right" 
            onClick={() => props.mobileClick(1)}>
            <Icon.ChevronRight size={16} />
        </button> : null}
        </>
    )
}
