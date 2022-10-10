import { useRef, useEffect, useCallback } from 'react';
import { propTypes } from 'react-bootstrap/esm/Image';
import './MapSearchBox.css';

export const MapSearchBox = ({ map, maps, onPlacesChanged, placeholder, mapState }) => {

    const input = useRef(null);
    const searchBox = useRef(null);

    const handleOnPlacesChanged = useCallback((e) => {
        // if (onPlacesChanged) {
        //     // onPlacesChanged(searchBox.current.getPlaces());
        //     onPlacesChanged(searchBox.current.getPlaces(input.current.value));
        //     console.log('e', input.current.value);
        // }
        onPlacesChanged(input.current.value);
    }, [onPlacesChanged, searchBox]);

    useEffect(() => {
        if (!searchBox.current && maps) {
            searchBox.current = new maps.places.SearchBox(input.current);
            // doTheThing();
            searchBox.current.addListener('places_changed', handleOnPlacesChanged);
        }

        return () => {
            if (maps) {
                searchBox.current = null;
                maps.event.clearInstanceListeners(searchBox);
            }
        };
    }, [maps, handleOnPlacesChanged]);
    
    const style = mapState.mapHover ? { opacity: 1 } : { opacity: 0 };

    const doTheThing = () => {

   
    searchBox.addListener("places_changed", () => {
        const places = searchBox.getPlaces();
    
        if (places.length == 0) {
          return;
        }
    
        // Clear out the old markers.
        // markers.forEach((marker) => {
        //   marker.setMap(null);
        // });
        // markers = [];
    
        // For each place, get the icon, name and location.
        const bounds = maps.LatLngBounds();
    
        places.forEach((place) => {
          if (!place.geometry || !place.geometry.location) {
            console.log("Returned place contains no geometry");
            return;
          }
    
        //   const icon = {
        //     url: place.icon as string,
        //     size: new google.maps.Size(71, 71),
        //     origin: new google.maps.Point(0, 0),
        //     anchor: new google.maps.Point(17, 34),
        //     scaledSize: new google.maps.Size(25, 25),
        //   };
    
          // Create a marker for each place.
        //   markers.push(
        //     new google.maps.Marker({
        //       map,
        //       icon,
        //       title: place.name,
        //       position: place.geometry.location,
        //     })
        //   );
    
          if (place.geometry.viewport) {
            // Only geocodes have viewport.
            bounds.union(place.geometry.viewport);
          } else {
            bounds.extend(place.geometry.location);
          }
        });
        map.fitBounds(bounds);
      });
    }
    

    return <input id="mapsearch" ref={input} placeholder={placeholder} type="text" style={style} />


}
