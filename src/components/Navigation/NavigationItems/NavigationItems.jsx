import React from "react";

import NavigationItem from "./NavigationItem/NavigationItem";

import classes from "./NavigationItems.module.css";

const NavigationItems = (props) => {
    return (
        <ul className={classes.NavigationItems}>
            <NavigationItem onClick={props.onClick} link="/">BurgerBuilder</NavigationItem>
            {props.isAuthenticated && <NavigationItem onClick={props.onClick} link="/orders">Orders</NavigationItem>}
            {props.isAuthenticated 
                ? <NavigationItem onClick={props.onClick} link="/logout">Logout</NavigationItem>
                : <NavigationItem onClick={props.onClick} link="/auth">Authenticate</NavigationItem>}
        </ul>
    );
}

export default NavigationItems;