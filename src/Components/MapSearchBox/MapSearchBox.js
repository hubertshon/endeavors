import { useRef, useEffect, useCallback } from 'react';
import './MapSearchBox.css';

export const MapSearchBox = ({ maps, onPlacesChanged, placeholder, mapState }) => {

    const input = useRef(null);
    const searchBox = useRef(null);

    const handleOnPlacesChanged = useCallback(() => {
        if (onPlacesChanged) {
            onPlacesChanged(searchBox.current.getPlaces());
        }
    }, [onPlacesChanged, searchBox]);

    useEffect(() => {
        if (!searchBox.current && maps) {
            searchBox.current = new maps.places.SearchBox(input.current);
            searchBox.current.addListener('placesChanged', handleOnPlacesChanged);
        }

        return () => {
            if (maps) {
                searchBox.current = null;
                maps.event.clearInstanceListeners(searchBox);
            }
        };
    }, [maps, handleOnPlacesChanged]);
    
    const style = mapState.mapHover ? { opacity: 1 } : { opacity: 0};

    return <input id="mapsearch" ref={input} placeholder={placeholder} type="text" style={style} />;


}
