import React from 'react';
import "./Nav.css"
import { Link } from 'react-router-dom';
export const Nav = (props) => {


return (
    <div className="nav-container">
        {props.navItems.map((item, index) => {
            return <Link to={item.path} className="nav-item" key={index}>{item.name}</Link>
        })}
    </div>
)
}
