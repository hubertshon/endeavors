import React from "react";
import "./Point.css";

export const Point = (props) => {


    return (
        <div className="point-container">
            <p>{props.name}</p>
            <p>{props.location}</p>
        </div>
    )
}
