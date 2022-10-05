import React from 'react';
import "./Nav.css"
import { Link } from 'react-router-dom';
export const Nav = (props) => {


return (
    <div className="nav-container">
        {props.navItems.map((item) => {
            return <Link to={item.path} class="nav-item">{item.name}</Link>
        })}
    </div>
)
}
