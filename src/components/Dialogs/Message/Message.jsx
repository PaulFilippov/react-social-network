import React from "react";
import styleClasses from './Message.module.css';

const Message = (props) => {

    return (
        <div className={styleClasses.message}>
            {props.message}
        </div>
    );
}

export default Message;