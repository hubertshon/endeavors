import React from 'react';
import "./Nav.css"
export const Nav = (props) => {


return (
    <div className="nav-container">
        {props.navItems.map((item) => {
            return <p class="nav-item">{item}</p>
        })}
    </div>
)
}
