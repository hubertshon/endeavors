import React, { useContext, useState }from "react"
import "./Map.css";
import GoogleMapReact from 'google-map-react';

// import * as Icon from 'react-feather';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from "@fortawesome/fontawesome-svg-core";
import { faLocationCrosshairs, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { MapsContext } from '../../Context/PointsContext';
import { MapSearchBox } from "../MapSearchBox/MapSearchBox";
// import { useFetcher } from "react-router-dom";

library.add(faLocationDot, faLocationCrosshairs);


export const Map = (props) => {

    const defaultProps = {
        center: {lat: 40.73, lng: -73.93}, 
        zoom: 12
    }

    const Marker = (mProps) => { 
        const style = mProps.$hover || mProps.id === mProps.hoverMarker ? { color: '#758BFD', transform: 'scale(1.5) translate(-35%, -100%)' } : { color: '#e95e02 '};

        return <div className="map-marker" style={style}>
            <FontAwesomeIcon icon="fa-solid fa-location-dot" size="xl" className="pin" />
        </div>
      }

    const TempMarker = (mProps) => { 
        const style = mProps.$hover || mProps.id === mProps.hoverMarker ? { color: '#758BFD', transform: 'scale(1.2)' } : { color: '#e95e02 '};
        // const hoverstyle =  ? { color: '#758BFD', transform: 'scale(1.5)' } : { color: '#e95e02 '};

        return <div className="map-marker" style={style}>
            <FontAwesomeIcon icon="fa-solid fa-location-crosshairs" size="xl"  />
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
    const [tempMarker, setTempMarker] = useState(null);


    const handleApiLoaded = (map, maps) => {
        setMap(map);
        setGoogleMaps(maps);
    };

    const placeMapPin = (event, context) => {
        if (mapState.pointSelecting) {
            props.handlePointSelect(event);
            //add to markers
            //save that to the state 
        } else if (context === 'search') {
            props.handlePointSelect(event);
        }

        setMapState(prevState => ({
            ...prevState,
            pointSelecting: false
        }));

        setTempMarker(null);

    }

    // const handleOnPlacesChange = useCallback(e => { 
    //     console.log('Map // handleOnPlacesChanged', e);
    //     if (e && e[0] && e[0].geometry) { 
    //         const lat = e[0].geometry.location.lat(); 
    //         const lng = e[0].geometry.location.lng(); 
    //         map.setCenter({ lat, lng }); 
    //         map.setZoom(12); 
    //     }}, [map]);

    const handleOnPlacesChange = async (e, param) => {
        if (param === 'search') {
            try {
                const geoHero = new googleMaps.Geocoder();
                const result = await geoHero.geocode({
                    "address": e
                })
                const lat = result.results[0].geometry.location.lat(); 
                const lng = result.results[0].geometry.location.lng(); 
                map.setCenter({ lat, lng }); 
                map.setZoom(12); 
                setTempMarker({
                    lat: lat,
                    lng: lng,
                })
            }
            catch(error) {
                console.error(error)
            }
        }
    }


    const handleMapHover = (value) => {
        setMapState(prevState => ({
            ...prevState,
            mapHover: value
        }));

    } 
    return (
        <div 
            className="map-container" 
            style={mapState.pointSelecting ? { border: '2px solid yellow'} : null}
            onMouseEnter={() => handleMapHover(true)}
            onMouseLeave={() => handleMapHover(false)}
        >
            <MapSearchBox 
                map={map} 
                maps={googleMaps} 
                onPlacesChanged={(e) => handleOnPlacesChange(e, 'search')} 
                onSetLocation={() => placeMapPin(tempMarker, 'search')}
                mapState={mapState} />
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
                onClick={(event) => {placeMapPin(event, 'point')}}
                >
                    {props.markers.map((mark) => {
                        return <Marker 
                        id={mark.id} 
                        hoverMarker={props.hoverMarkerId}
                        key={mark.id} 
                        lat={mark.lat} 
                        lng={mark.lng} />
                    })}
                    {tempMarker ? 
                    <TempMarker 
                        lat={tempMarker.lat} 
                        lng={tempMarker.lng}/> : null}
                </GoogleMapReact>
                {/* <p>Map Goes Here</p> */}

        </div>
    )
}

                // overlayViewDivStyle={{pointerEvents: 'none'}}
