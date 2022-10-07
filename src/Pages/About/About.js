import React from "react";
import './About.css';

import { Container, Row, Col } from "react-bootstrap";


export const About = () => {



    return (
        <Container className="about-container">
            <div class="quote-area">
                <Row>
                    <h1 class="quote">Feeling and longing are the motive forces behind all human <strong>endeavor</strong> and human creations.</h1>
                </Row>
                <Row>
                    <h5 class="author">Albert Einstein</h5>
                </Row>
            </div>
            <Container className="info-container">
                <Row class="d-flex flex-wrap">
                    <Col className="align-content-left">
                    <p class="about-text">Endeavors is a travel logging app meant to record meaningful steps from each of your journeys. </p>
                    </Col>
                    <Col className="px-5">
                    <p class="about-text">Create a new <strong>Journey</strong> to start documenting one of your travels over a period of time. This can either be a simple day trip or a full sabbatical away.</p>
                    </Col>
                    <Col className="align-content-right">
                    <p class="about-text">Document the highlights of your trip by adding <strong>Points</strong>. Points can include a brief summary, map marker, and photo. </p>
                    </Col>
                </Row>
            </Container>
        </Container>

    )
}
