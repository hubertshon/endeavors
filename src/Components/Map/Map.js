import React, { useContext, useEffect }from "react"
import "./Map.css";
import GoogleMapReact from 'google-map-react';

// import * as Icon from 'react-feather';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from "@fortawesome/fontawesome-svg-core";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { MapsContext } from '../../Context/PointsContext';

library.add(faLocationDot);



export const Map = (props) => {

    const defaultProps = {
        center: {lat: 40.73, lng: -73.93}, 
        zoom: 12
    }

    const Marker = (mProps) => {
        const style = mProps.$hover ? { color: '#758BFD', transform: 'scale(1.5)' } : { color: '#e95e02 '};

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

    const {mapState, setMapState} = useContext(MapsContext);

    // const loadMap = (map, maps) => {
    //     map.setOptions({
    //         draggableCursor: "default",
    //         draggingCursor: "pointer"
    //       });
    // }


    // const handleApiLoaded = (map, maps) => {
    //    console.log('map', map);
    //    console.log('maps', maps);
    //   };

    const placeMapPin = (event) => {
        return mapState.pointSelecting ? console.log('placing pin', event) : null; 
    }


    useEffect((e) => {
        console.log('new effect', e)
    }, []);

    return (
        <div className="map-container" style={mapState.pointSelecting ? { border: '3px solid yellow'} : null}>
            <GoogleMapReact
                // className={`${mapState.pointSelecting ? 'point-selecting' : ''}`}
                bootstrapURLKeys={{
                    key: process.env.REACT_APP_GOOGLE_MAPS_KEY,
                    libraries: ['places', 'geometry']
                }}
                defaultCenter={defaultProps.center}
                defaultZoom={defaultProps.zoom}
                options={{styles: styleOptions}
                }
                yesIWantToUseGoogleMapApiInternals
                // onGoogleApiLoaded={({ map, maps }) => loadMap(map, maps)}

                // overlayViewDivStyle={{pointerEvents: 'none'}}
                onChildClick={(e, a) => console.log('hi child', a)}
                onClick={(event) => {placeMapPin(event)}}
                >
                    {props.markers.map((mark) => {
                        return <Marker id={mark.id} key={mark.id} lat={mark.lat} lng={mark.lng} />
                    })}
                </GoogleMapReact>
                {/* <p>Map Goes Here</p> */}

        </div>
    )
}
