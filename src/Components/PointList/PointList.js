import React, { useState }from "react";
import { Point } from "../Point/Point";


export const PointList = (props) => {

    const [pointList, setPointList] = useState([]);
    
    return (
        <div className="container" data-testid="container">
            {pointList !== null ? props.pointList.map((point) => {
                return <Point name={point.name} location={point.location} />
            }) : null }
        </div>
    )


}
