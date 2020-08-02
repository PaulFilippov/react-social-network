import store from "./store";

const ADD_MESSAGE = 'ADD-MESSAGE';

type DialogType = {
    id: number
    name: string
}

type MessageType = {
    id: number
    message: string
}

let initialState = {
    dialogs: [
        {id: 1, name: "Paha1"},
        {id: 2, name: "Paha2"},
        {id: 3, name: "Paha3"},
        {id: 4, name: "Paha4"},
        {id: 5, name: "Paha5"},
    ] as Array<DialogType>,
    messages: [
        {id: 1, message: "hi1"},
        {id: 2, message: "hi2"},
        {id: 3, message: "hi3"},
    ] as Array<MessageType>
};

export type initialStateType = typeof initialState;

const dilogsReducer = (state = initialState, action: any): initialStateType => {

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

type SendMessageCreatorActionType = {
    type: typeof ADD_MESSAGE
    newMessageBody: string
}

export const addMessageAC = (newMessageBody: string): SendMessageCreatorActionType => ({type: ADD_MESSAGE, newMessageBody})

export default dilogsReducer;