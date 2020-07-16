import React from "react";
import styleClasses from './Dialogs.module.css';
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import {Redirect} from "react-router-dom";
import AddMessageForm from "./AddMessageForm/AddMessageForm";


const Dialogs = (props) => {

    let state = props.dialogsPage;

    let dialogElements = state.dialogs
        .map(dialog => <DialogItem name={dialog.name}
                                   key={dialog.id}
                                   id={dialog.id}/>);

    let messagesElements = state.messages
        .map(m => <Message message={m.message}
                           key={m.id}/>);

    let addNewMessage = (values) => {
        props.addMessage(values.newMessageText);
    }

    if (!props.isAuth) return <Redirect to={"/login"}/>;

    return (
        <div className={styleClasses.dialogs}>
            <div className={styleClasses.dialogsItems}>
                {dialogElements}
            </div>
            <div className={styleClasses.messages}>
                <div>{messagesElements}</div>
            </div>
            <AddMessageForm onSubmit={addNewMessage}/>
        </div>
    );
}

export default Dialogs;