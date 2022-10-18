import React, {useContext, useEffect, useState } from 'react';
import './Photos.css';
import { Container, Row, Col } from 'react-bootstrap';
import { PointsContext } from '../../Context/PointsContext';
import { Modal } from 'react-bootstrap';
import * as Icon from 'react-feather';

export const Photos = () => {

    const { journeysList, setJourneysList } = useContext(PointsContext);
    const [photoPoints, setPhotoPoints] = useState([]);
    const [ showPhoto, setShowPhoto ] = useState(false);
    const [ currentPhoto, setCurrentPhoto] = useState('');

    useEffect(() => {
        // photoPoints.length = 0;
        const photoJourneys = journeysList.journeys.map((journey) => {
            const newEntry = {
                journeyTitle: journey.name,
                journeyId: journey.id,
                photos: []
            }
            
            newEntry.photos = journey.points.filter((point) => {
                console.log(point.img.length);
                return point.img.length > 0
            });
            
            return newEntry
        });

        const filtered = photoJourneys.filter((photoJourney) => {
            return photoJourney.photos.length > 0
        })

        console.log('photoJourneys', photoJourneys);
        setPhotoPoints(filtered);

    }, [journeysList]);

    return (
        <>
        <Container>
            {photoPoints?.map((journey) => {
                return (
                <Row className="mb-5">
                    <Row><h5 className="journeyTitle">{journey.journeyTitle}</h5></Row>
                    <Row className="d-flex">
                        {journey.photos.map((point) => {

                            return (
                            // <div className="photo-card" onClick={() => {setShowPhoto(true); setCurrentPhoto(require(`../../Assets/images/${point.img}`))}}>
                            <Col lg={2}>
                                <img 
                                    src={require(`../../Assets/images/${point.img}`)} 
                                    alt="image1" className="j-image" 
                                    onClick={() => {setShowPhoto(true); setCurrentPhoto(require(`../../Assets/images/${point.img}`))}}/>
                            </Col>
                            )
                        })
                        }
                    </Row>
                </Row>
            )
        })}
        </Container>


        <Modal show={showPhoto} size="lg" variant="dark" onHide={() => setShowPhoto(false)}>
            <img src={currentPhoto} alt="image1" />
        </Modal>
        </>

    )




}
