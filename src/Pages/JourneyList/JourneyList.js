import React from 'react';
import { Row, Col } from 'react-bootstrap';

export const JourneyList = (props) => {

    return (
        <div class="journey-list">
            {props.journeys.map((journey) => {
               return ( 
               <Row>
                    <Col>
                        {journey.name}
                    </Col>
                    <Col>
                        {journey.description}
                    </Col>
                </Row>
                    
               )
            })}
        </div>
    )
}
