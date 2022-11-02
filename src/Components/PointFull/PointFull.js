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
    const imageInput = useRef();

    useEffect(() => {
        setMapState({...mapState})
        document.addEventListener("click", handleClickOutside);

        return function cleanup() {
            document.removeEventListener("click", handleClickOutside);
          };
    }, []);

    const handleInputClick = (e) => {
        setFormState({
            ...formState,
            [e.target.id]: true
        });
    }

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

    const handleImageChange = event => {
        const fileUploaded = event.target.files[0];
  };

    const handleImageClick = () => {
        imageInput.current.click();
    }


    return (
        <div className="d-flex point-full-container flex-column">
            <div className="d-flex justify-content-between pointFull-header">
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
            <button className="btn btn-sm btn-link-light fp-close" style={{ pointerEvents: "all" }}
                onClick={() => props.handleClose()}
                >
                    <Icon.X size="16" />
            </button>
            </div>
 

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



            
            <div className="align-self-end justify-content-between align-items-center button-dock mt-auto">
            {/* {formState.pointLocation ? 
            <input
                name="pointLocation"
                className="align-self-end location w-50"
                id="location"
                type="text"
                ref={refOne}
                defaultValue={props.point.location} 
                onChange={(e) => {props.onChange(e, props.point.id)}} /> 
            :  */}
            <p className="location mt-1 mb-0"
                
                ref={refOne} 
                id="pointLocation" 
                onClick={(e) => handleInputClick(e)}
                >{props.point.location}</p>
            {/* } */}
                    <div>
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
                        onClick={() => handleImageClick()}
                        >
                            <Icon.Camera size="16" />
                        </button>
                    </div>
            </div>
            <input type="file"
                ref={imageInput}
                onChange={handleImageChange}
                style={{display:'none'}} 
            /> 
        </div>
    )
}
