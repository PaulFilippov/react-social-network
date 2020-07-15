import store from "./store";

const ADD_MESSAGE = 'ADD-MESSAGE';

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
    ]
};

const dilogsReducer = (state = initialState, action) => {

    switch (action.type) {
        case ADD_MESSAGE:
            let newMessage = action.newMessageBody;
            return  {
                ...state,
                messages: [...state.messages, {id: 6, message: newMessage}],
            };
        default:
            return state;
    }
}

export const addMessageAC = (newMessageBody) => ({type: ADD_MESSAGE, newMessageBody})

export default dilogsReducer;