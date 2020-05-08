import React from "react";

import classes from "./Logo.module.css";
import BurgerLogo from "../../assets/images/logo.png"

const Logo = (props) => {
    return (
        <div style={{height: props.height}} className={classes.Logo}>
            <img src={BurgerLogo} alt="Burger Logo"/>
        </div>
    );
}

export default Logo;