import React, { useEffect, useState } from "react";
import './About.css';
import { quotes } from "../../Assets/data/quotes";

import { Container, Row, Col } from "react-bootstrap";
// import pointImg from '../../Assets/images/screely-1665285971610.png';
// import pointImg from '../../Assets/images/screely-1665274358096_copy.png'

export const About = () => {

    const [quote, setQuote] = useState({ text: null, author: null});
    const quoteItemNum = quotes.length - 1;
    const randomIntFromInterval = (max, min) => {
        return Math.floor(Math.random() * (max - min + 1) + min)
    }


    useEffect(() => {
        const randomIndex = randomIntFromInterval(0, quoteItemNum);
        setQuote(quotes[randomIndex]);

    }, [])

    return (
        <Container className="about-container">

            <Row className="quote-area d-flex">
                <Row className="d-flex align-content-center">
                    <h1 className="about-quote">{quote.text}</h1>
                </Row>
                <Row>
                    <h5 className="about-author">{quote.author}</h5>
                </Row>
            </Row>
                <Row className="d-flex flex-wrap detailrow g-5">
                    <Col className="align-content-left" sm={12} md={4}>
                    <p className="about-text">Endeavors is a travel logging app meant to record meaningful steps from each of your journeys.</p>
                    </Col>
                    <Col className="" sm={12} md={4}>
                    <p className="about-text">Create a new <strong>Journey</strong> to start documenting one of your travels over a period of time. This can either be a simple day trip or a full sabbatical away.</p>
                    </Col>
                    <Col className="align-content-right" sm={12} md={4}>
                
                    <p className="about-text">Document the highlights of your trip by adding <strong>Points</strong>. Points can include a brief summary, map marker, and photo. </p>
                    </Col>
                </Row>
        </Container>

    )
}
