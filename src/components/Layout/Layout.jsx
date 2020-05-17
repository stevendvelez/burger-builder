import React, { useState } from "react";
import { connect } from "react-redux";

import Auxilary from "../../hoc/Auxilary/Auxilary";
import SideDrawer from "../Navigation/SideDrawer/SideDrawer";
import Toolbar from "../Navigation/Toolbar/Toolbar";

import classes from "./Layout.module.css";

const Layout = props => {
    const [sideDrawer, setSideDrawer] = useState(false);
    
    const sideDrawerClosedHandler = () => {
        setSideDrawer(false);
    }

    const sideDrawerToggleHandler = () => {
        setSideDrawer(!sideDrawer);
    }

    return (
        <Auxilary>
            <Toolbar
                isAuth={props.isAuthenticated} 
                drawerToggleClicked={sideDrawerToggleHandler}/>
            <SideDrawer
                isAuth={props.isAuthenticated} 
                open={sideDrawer} 
                closed={sideDrawerClosedHandler}/>
            <main className={classes.Layout}>
                {props.children}
            </main>
        </Auxilary>
    );
}


const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    };
};

export default connect(mapStateToProps)(Layout);