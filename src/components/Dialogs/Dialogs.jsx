import React from "react";
import s from './Dialogs.module.css';
import {NavLink} from "react-router-dom";
import DialogItem from "./DialogItem/DialogsItem";
import Message from "./Message/Message";


const Dialogs = (props) => {

    let dialogElements = props.state.dialogs.map( (dialog) => (
            <DialogItem name={dialog.name} id={dialog.id}/>
            )
        );

    let messagesElements = props.state.messages.map( (message) => (
            <Message message={message.message}/>
            )
        );

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogElements}
            </div>
            <div className={s.messages}>
               {messagesElements}
            </div>
        </div>
    );
}

export default Dialogs;