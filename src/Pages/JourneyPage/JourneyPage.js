import React, { useEffect, useState, useContext } from "react";
import './JourneyPage.css';
import { PointList } from "../../Components/PointList/PointList";
import { Map } from "../../Components/Map/Map";
import { useParams, Link } from "react-router-dom";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useLocation } from "react-router-dom";
import { PointsContext } from '../../Context/PointsContext';
import * as Icon from 'react-feather';


export const Journey = (props) => {

    const location = useLocation();
    const { journey } = location.state; 
    const [markers, setMarkers] = useState([]);
    const [selectedPoint, setSelectedPoint] = useState({});
    const journeyId = useParams();
    const { journeysList, setJourneysList } = useContext(PointsContext);
    const [hoverMarker, setHoverMarker] = useState(null);
    const newMarkers = [];

   
    useEffect(() => {
        journey.points.forEach((point) => {
            newMarkers.push(point.loc)
        });
        setMarkers(newMarkers);
    }, [journeysList]);



    const selectMapPoint = (e) => {
        setSelectedPoint(e);
    }

    const selectMapLocation = (e, address) => {

        const updatingJourneys = [...journeysList.journeys];
        const updateIndex = updatingJourneys.findIndex((journey) => {
            return journey.id == journeyId.journeyId
        });
        

        const pointUpdateIndex = updatingJourneys[updateIndex].points.findIndex((point) => {
            return point.id == selectedPoint.id
        });

        console.log('address', address);
        setJourneysList(prevState => ({
            journeys: prevState.journeys.map(
                (journeyIndex) => {
                if (journeyIndex.id === journey.id) {
                    journeyIndex.points[pointUpdateIndex].loc.lng = e.lng;
                    journeyIndex.points[pointUpdateIndex].loc.lat = e.lat
                    journeyIndex.points[pointUpdateIndex].location = address
                    return journeyIndex
                } else {
                    return journeyIndex
                }
            })
        }));

    }

    const setHoverMarkerFunc = (point) => {
        if (point) {
            setHoverMarker(point.id)
        } else {
            setHoverMarker(null)
        }
    }

    return (
            <Container className="d-flex flex-column p-2">
                <div className="d-flex journey-header">
                    <Link className="journey-buttonDock" to='/journey'>
                        <Icon.ChevronLeft className="mx-1" size={20}/>
                    </Link> 
                    <h6 className="header-title mx-2">{journey.name}</h6>
                    <h6 className="header-date mx-4">3.19 - 3.31.2021</h6>
                    
                </div>
                <Row>
                    <Col className="pointListCol" lg={5}>
                    <PointList 
                        handlePointSelect={(e) => selectMapPoint(e)} 
                        handlePointHover={(e) => setHoverMarkerFunc(e)}
                    /></Col>
                    <Col className="d-flex justify-content-center" lg={7}>
                    <Map 
                        markers={markers} 
                        handlePointSelect={(e, address) => selectMapLocation(e, address)} 
                        hoverMarkerId={hoverMarker}
                    />

                    </Col>
                </Row>
            </Container>
    )
}
