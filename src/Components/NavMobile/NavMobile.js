import { useState } from "react";
import './NavMobile.css'
import { Row } from "react-bootstrap";
import * as Icon from 'react-feather';
import {Link} from 'react-router-dom';

export const NavMobile = (props) => {

    const [ navShow, setNavShow ] = useState(false);
    

    return (
        <>
        <div className="mobile-visible menu-icon" onClick={() => setNavShow(!navShow)}>
            <Icon.Menu  size={20} color="white" />
        </div>
        {navShow ? 
            <div className="mobile-visible menu">
                

                <div className="menuInner">
                <Row className="closeRow justify-content-left">
                    <div className="closeButton">
                        <Icon.X size={20} color="#E5E5E5" onClick={() => setNavShow(!navShow)} />
                    </div>
                </Row>
                {props.navItems.map((link, index) => {
                    return (
                    <Row className="mb-3">
                        <Link to={link.path} onClick={() => setNavShow(false)} className="nav-menu-item" key={'menu' + index}>{link.name}</Link>
                    </Row>  
                    )    
                })}
                </div>
                
            
            </div> 
            : null}
    </>
    )
}
