import React, { useState, useRef, useEffect } from "react";
import "./PointFull.css";
import { MyEditor } from "../Editor/Editor";

import * as Icon from 'react-feather';


export const PointFull = (props) => {

    // form section
    let formControls = {
        pointName: false,
        pointLocation: false,
        pointText: false
    }
    const [formState, setFormState] = useState(formControls);
    const refOne = useRef(false);

    const handleInputClick = (e) => {
        setFormState({
                ...formState,
                [e.target.id]: true
            });
    }

    

    useEffect(() => {
        console.log('formState', formState);
        document.addEventListener("click", handleClickOutside);

        return function cleanup() {
            document.removeEventListener("click", handleClickOutside);
          };
    }, []);

    const handleClickOutside = (e) => {
        console.log('clicking', refOne.current);
        if (refOne.current && !refOne.current.contains(e.target)) {
            setFormState({
                ...formState,
                [e.target.id]: !formState[e.target.id]
            });
        } 
    }


    return (
        <div className="d-flex point-full-container flex-column">
            {formState.pointName ? 
                <input 
                    name="pointName" 
                    id="pointNameInput" 
                    type="text" 
                    ref={refOne} 
                    value={props.point.name} 
                    onChange={() => {}} /> 
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
                type="text"
                ref={refOne}
                value={props.point.location} 
                onChange={() => {}} /> 
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
                    type="text"
                    // ref={refOne}
                    text={props.point.text} 
                     /> 
                : 
                <p className="point-body mt-4"
                    ref={refOne}
                    id="pointText"
                    onClick={(e) => handleInputClick(e)}
                    >{props.point.text}</p>
                // <h6 className="location" 
                //     ref={refOne} 
                //     id="pointLocation" 
                //     onClick={(e) => handleInputClick(e)}
                //     >{props.point.location}</h6>
                }
            
            <div className="align-self-end button-dock mt-auto">
                    <button className="btn btn-sm btn-link-light"
                    >
                        <Icon.Trash size="16" />
                    </button>
                    {/* <button className="btn btn-sm btn-link-light"
                    >
                        <Icon.PenTool size="16" />
                    </button> */}
                    <button className="btn btn-sm btn-link-light"
                    >
                        <Icon.MapPin size="16" />
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
