import React, { useContext, useEffect, useCallback, useState }from "react"
import "./Map.css";
import GoogleMapReact from 'google-map-react';

// import * as Icon from 'react-feather';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from "@fortawesome/fontawesome-svg-core";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { MapsContext, PointsContext } from '../../Context/PointsContext';
import { MapSearchBox } from "../MapSearchBox/MapSearchBox";

library.add(faLocationDot);


export const Map = (props) => {

    const defaultProps = {
        center: {lat: 40.73, lng: -73.93}, 
        zoom: 12
    }

    const Marker = (mProps) => { 
        const style = mProps.$hover || mProps.id === mProps.hoverMarker ? { color: '#758BFD', transform: 'scale(1.5)' } : { color: '#e95e02 '};
        // const hoverstyle =  ? { color: '#758BFD', transform: 'scale(1.5)' } : { color: '#e95e02 '};

        return <div className="SuperAwesomePin" style={style}>
            <FontAwesomeIcon icon="fa-solid fa-location-dot" size="xl" className="pin" />
        </div>
      }

    const styleOptions = [
        {
            "featureType": "administrative",
            "elementType": "all",
            "stylers": [
                {
                    "saturation": "-100"
                }
            ]
        },
        {
            "featureType": "administrative.province",
            "elementType": "all",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "landscape",
            "elementType": "all",
            "stylers": [
                {
                    "saturation": -100
                },
                {
                    "lightness": 65
                },
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "poi",
            "elementType": "all",
            "stylers": [
                {
                    "saturation": -100
                },
                {
                    "lightness": "50"
                },
                {
                    "visibility": "simplified"
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "all",
            "stylers": [
                {
                    "saturation": "-100"
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "all",
            "stylers": [
                {
                    "visibility": "simplified"
                }
            ]
        },
        {
            "featureType": "road.arterial",
            "elementType": "all",
            "stylers": [
                {
                    "lightness": "30"
                }
            ]
        },
        {
            "featureType": "road.local",
            "elementType": "all",
            "stylers": [
                {
                    "lightness": "40"
                }
            ]
        },
        {
            "featureType": "transit",
            "elementType": "all",
            "stylers": [
                {
                    "saturation": -100
                },
                {
                    "visibility": "simplified"
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "geometry",
            "stylers": [
                {
                    "hue": "#ffff00"
                },
                {
                    "lightness": -25
                },
                {
                    "saturation": -97
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "labels",
            "stylers": [
                {
                    "lightness": -25
                },
                {
                    "saturation": -100
                }
            ]
        }
    ]

    const [map, setMap] = useState(null);
    const [googleMaps, setGoogleMaps] = useState(null);
    const {mapState, setMapState} = useContext(MapsContext);


    const handleApiLoaded = (map, maps) => {
        setMap(map);
        setGoogleMaps(maps);
    };

    const placeMapPin = (event) => {
        if (mapState.pointSelecting) {
            props.handlePointSelect(event);
            //add to markers
            //save that to the state 
        }

        setMapState(prevState => ({
            ...prevState,
            pointSelecting: false
        }));

    }

    const handleOnPlacesChange = useCallback(e => { 
        if (e && e[0] && e[0].geometry) { 
            const lat = e[0].geometry.location.lat(); 
            const lng = e[0].geometry.location.lng(); 
            map.setCenter({ lat, lng }); 
            map.setZoom(12); 
        }}, [map]);


    const handleMapHover = (value) => {
        setMapState(prevState => ({
            ...prevState,
            mapHover: value
        }));

    } 
    return (
        <div 
            className="map-container" 
            style={mapState.pointSelecting ? { border: '3px solid yellow'} : null}
            onMouseEnter={() => handleMapHover(true)}
            onMouseLeave={() => handleMapHover(false)}
        >
            <MapSearchBox maps={googleMaps} onPlacesChanged={handleOnPlacesChange()} mapState={mapState} />
            <GoogleMapReact
                bootstrapURLKeys={{
                    key: process.env.REACT_APP_GOOGLE_MAPS_KEY,
                    libraries: ['places', 'geometry']
                }}
                defaultCenter={defaultProps.center}
                defaultZoom={defaultProps.zoom}
                options={{styles: styleOptions}
                }
                yesIWantToUseGoogleMapApiInternals={true}
                onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
                onClick={(event) => {placeMapPin(event)}}
                >
                    {props.markers.map((mark) => {
                        return <Marker 
                        id={mark.id} 
                        hoverMarker={props.hoverMarkerId}
                        key={mark.id} 
                        lat={mark.lat} 
                        lng={mark.lng} />
                    })}
                </GoogleMapReact>
                {/* <p>Map Goes Here</p> */}

        </div>
    )
}

                // overlayViewDivStyle={{pointerEvents: 'none'}}
