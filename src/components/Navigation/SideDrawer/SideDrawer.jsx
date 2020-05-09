import React from "react";

import Auxilary from "../../../hoc/Auxilary/Auxilary";
import Backdrop from "../../UI/Backdrop/Backdrop";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";

import classes from "./SideDrawer.module.css";

const SideDrawer = (props) => {
    let attachedClasses = [classes.SideDrawer, classes.Closed];

    if (props.open) {
        attachedClasses = [classes.SideDrawer, classes.Open];
    }

    return (
        <Auxilary>
            <Backdrop show={props.open} clicked={props.closed}/>
            <div className={attachedClasses.join(" ")}>
                <Logo height="11%"/>
                <nav>
                    <NavigationItems 
                        isAuthenticated={props.isAuth}
                        onClick={props.closed}/>
                </nav>
            </div>
        </Auxilary>
    );
}

export default SideDrawer;