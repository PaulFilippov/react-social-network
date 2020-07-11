import React from "react";
import styleClasses from './DialogItem.module.css';
import {NavLink} from "react-router-dom";

const DialogItem = (props) => {
    let path = "/dialogs/" + props.id;
    return (
        <div className={styleClasses.item}>
            <NavLink to={path} activeClassName={styleClasses.active}>
                {props.name}
            </NavLink>
        </div>
    );
}

export default DialogItem;