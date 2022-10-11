import React, { useState, useRef, useEffect, useContext } from "react";
import "./PointFull.css";
import { MyEditor } from "../Editor/Editor";
import { MapsContext } from "../../Context/PointsContext";

import * as Icon from 'react-feather';


export const PointFull = (props) => {

    // form section
    let formControls = {
        pointName: false,
        pointLocation: false,
        pointText: false
    }
    const [formState, setFormState] = useState(formControls);
    const {mapState, setMapState} = useContext(MapsContext);
    const refOne = useRef(false);

    const handleInputClick = (e) => {
        setFormState({
            ...formState,
            [e.target.id]: true
        });
    }

    

    useEffect(() => {
        setMapState({...mapState})
        document.addEventListener("click", handleClickOutside);

        return function cleanup() {
            document.removeEventListener("click", handleClickOutside);
          };
    }, []);

    const handleClickOutside = (e) => {
        if (refOne.current && !refOne.current.contains(e.target)) {
            setFormState({
                ...formState,
                [e.target.id]: !formState[e.target.id]
            });
        } 
    }

    const makePointSelectable = (e) => {
        setMapState(prevState => ({
                pointSelecting: !prevState.pointSelecting
        }));
    }

    const handleText = (e, pointId) => {
        const eventObj = {
            target: {
                id: "text",
                value: e
            }
        }
        props.onChange(eventObj, props.point.id)
    }


    return (
        <div className="d-flex point-full-container flex-column">
            {formState.pointName ? 
                <input 
                    name="pointName" 
                    id="name" 
                    type="text" 
                    ref={refOne} 
                    defaultValue={props.point.name} 
                    onChange={(e) => {props.onChange(e, props.point.id)}} /> 
                : 
                <h4 className="point-title"
                    ref={refOne} 
                    id="pointName"
                    onClick={(e) => handleInputClick(e)}
                >{props.point.name}</h4>
            }
            {formState.pointLocation ? 
            <input
                name="pointLocation"
                id="location"
                type="text"
                ref={refOne}
                defaultValue={props.point.location} 
                onChange={(e) => {props.onChange(e, props.point.id)}} /> 
            : 
            <h6 className="location" 
                ref={refOne} 
                id="pointLocation" 
                onClick={(e) => handleInputClick(e)}
                >{props.point.location}</h6>
            }

            {formState.pointText ? 
                <MyEditor
                    name="pointText"
                    id="text"
                    type="text"
                    ref={refOne}
                    text={props.point.text}
                    getEditorText={(e) => handleText(e, props.point.id)}
                    // handleChange={(e) => {props.onChange(e, props.point.id)}} 
                     /> 
                : 
                <p className="point-body mt-4"
                    ref={refOne}
                    id="pointText"
                    onClick={(e) => handleInputClick(e)}
                    >{props.point.text}</p>
                }


            {props.point.img.length > 0 ? 
            <img src={require(`../../Assets/images/${props.point.img}`)} className="image" alt="image1" /> : null }

            
            <div className="align-self-end button-dock mt-auto">
                    <button className="btn btn-sm btn-link-light"
                    onClick={() => props.showDeleteModal()}
                    >
                        <Icon.Trash size="16" />
                    </button>
                    <button className={`btn btn-sm btn-link-light ${mapState.pointSelecting ? 'b-highlight' : ''}`}
                    onClick={makePointSelectable}
                    >
                        <Icon.MapPin size="16" />
                    </button>
                    <button className="btn btn-sm btn-link-light"
                    >
                        <Icon.Camera size="16" />
                    </button>
                    <button className="btn btn-sm btn-link-light"
                    onClick={() => props.handleClose()}
                    >
                        <Icon.X size="16" />
                    </button>
            </div>
        </div>
    )
}
