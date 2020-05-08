import React from "react";
import { NavLink } from "react-router-dom";

import classes from "./NavigationItem.module.css";

const NavigationItem = (props) => {
    return (
        <li onClick={props.onClick} className={classes.NavigationItem}>
            <NavLink 
                to={props.link}
                exact
                activeClassName={classes.active}>
                    {props.children}
            </NavLink>
        </li>
    );
}

export default NavigationItem;