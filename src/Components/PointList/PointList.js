import React, { useContext }from "react";
import { Point } from "../Point/Point";
import { PointsContext } from "../../Context/PointsContext";

import * as Icon from "react-feather";



export const PointList = () => {

    const  {pointsList, setPointsList} = useContext(PointsContext);

    return (
        <div className="container" data-testid="container">
            {pointsList !== null ? pointsList.map((point, index) => {
                return <Point key={index} name={point.name} location={point.location} />
            }) : null }
            <button 
                className="btn btn-light"
                onClick={() => setPointsList([...pointsList, {name: "New", location: "New"}])}
                ><Icon.Plus size="18" />
            </button>
        </div>
    )


}
