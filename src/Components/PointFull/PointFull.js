import React, { useContext } from "react";
import "./PointFull.css";
import Container from 'react-bootstrap/Container';
// import { PointsContext } from "../../Context/PointsContext";

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import * as Icon from 'react-feather';


export const PointFull = (props) => {

    return (
        <div class="d-flex point-full-container flex-column">
            <h4 class="point-title">{props.point.name}</h4>
            <h6 class="location">{props.point.location}</h6>
            <p class="point-body mt-4">{props.point.text}</p>
            <div className="align-self-end button-dock">
                    <button className="btn btn-sm btn-link-light"
                    >
                        <Icon.Trash size="16" />
                    </button>
                    <button className="btn btn-sm btn-link-light"
                    >
                        <Icon.PenTool size="16" />
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
