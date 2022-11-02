import React, {useContext, useEffect, useState } from 'react';
import './Photos.css';
import { Container, Row, Col } from 'react-bootstrap';
import { PointsContext } from '../../Context/PointsContext';
import { Modal } from 'react-bootstrap';

export const Photos = () => {

    const { journeysList, setJourneysList } = useContext(PointsContext);
    const [photoPoints, setPhotoPoints] = useState([]);
    const [ showPhoto, setShowPhoto ] = useState(false);
    const [ currentPhoto, setCurrentPhoto] = useState('');

    useEffect(() => {
        const photoJourneys = journeysList.journeys.map((journey) => {
            const newEntry = {
                journeyTitle: journey.name,
                journeyId: journey.id,
                photos: []
            }
            
            newEntry.photos = journey.points.filter((point) => {
                return point.img.length > 0
            });
            
            return newEntry
        });
        const filtered = photoJourneys.filter((photoJourney) => {
            return photoJourney.photos.length > 0
        })
        setPhotoPoints(filtered);

    }, [journeysList]);

    return (
        <>
        <Container>
            {photoPoints?.map((journey) => {
                return (
                <Row className="mb-3">
                    <Row><h5 className="journeyTitle mb-3">{journey.journeyTitle}</h5></Row>
                    <Row className="d-flex">
                        {journey.photos.map((point) => {

                            return (
                            <Col xs={6} lg={2} className="mb-4">
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
