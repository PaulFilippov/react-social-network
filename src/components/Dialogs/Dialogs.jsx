import React from "react";
import styleClasses from './Dialogs.module.css';
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import {Redirect} from "react-router-dom";


const Dialogs = (props) => {

    let state = props.dialogsPage;

    let dialogElements = state.dialogs
        .map( dialog => <DialogItem name={dialog.name} key={dialog.id} id={dialog.id}/> );

    let messagesElements = state.messages
        .map( m => <Message message={m.message} key={m.id}/> );

    let addMessage = () => {
        props.addMessage();
    };

    let onMessageChange = (event)=> {
        let text = event.target.value;
        props.updateNewMessageBody(text);
    }

    if (!props.isAuth) return <Redirect to={"/login"}/>;

    return (
        <div className={styleClasses.dialogs}>
            <div className={styleClasses.dialogsItems}>
                {dialogElements}
            </div>
            <div className={styleClasses.messages}>
                <div>{messagesElements}</div>
                <div>
                    <div>
                        <div>
                            <textarea onChange={onMessageChange}
                                      placeholder='Enter message'
                                      value={state.newMessageText}>
                            </textarea>
                        </div>
                        <div>
                            <button onClick={addMessage}>Send message</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dialogs;