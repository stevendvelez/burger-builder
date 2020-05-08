import React from "react";

import Auxilary from "../../../hoc/Auxilary/Auxilary";
import Backdrop from "../Backdrop/Backdrop";

import classes from "./Modal.module.css";

const Modal = (props) => {
    return(
        <Auxilary>
            <Backdrop clicked={props.modalClosed} show={props.show}/>
            <div style={{
                opacity: props.show ? 1 : 0,
                transform: props.show ? "translateY(0)" : "translateY(-100vh)"
            }} className={classes.Modal}>{props.children}</div>
        </Auxilary>
    );
}

export default Modal;