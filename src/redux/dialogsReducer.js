import store from "./store";

const ADD_MESSAGE = 'ADD-MESSAGE';
const UPDATE_NEW_MESSAGE_BODY_TEXT = 'UPDATE-NEW-MESSAGE-BODY-TEXT';

let initialState = {
    dialogs: [
        {id: 1, name: "Paha1"},
        {id: 2, name: "Paha2"},
        {id: 3, name: "Paha3"},
        {id: 4, name: "Paha4"},
        {id: 5, name: "Paha5"},
    ],
    messages: [
        {id: 1, message: "hi1"},
        {id: 2, message: "hi2"},
        {id: 3, message: "hi3"},
    ],
    newMessageText: '',
};

const dilogsReducer = (state = initialState, action) => {

    switch (action.type) {
        case ADD_MESSAGE:
            let newMessage = state.newMessageText;
            return  {
                ...state,
                messages: [...state.messages, {id: 6, message: newMessage}],
                newMessageText: ''
            };
        case UPDATE_NEW_MESSAGE_BODY_TEXT:
            return  {
                ...state,
                newMessageText: action.newText
            };
        default:
            return state;
    }
}

export const addMessageAC = () => ({type: ADD_MESSAGE})
export const updateNewMessageBodyAC = (text) => ({
    type: UPDATE_NEW_MESSAGE_BODY_TEXT,
    newText: text
})


export default dilogsReducer;