import {InferActionTypes} from "./reduxStore";


const ADD_MESSAGE = 'SN/DIALOGS/ADD-MESSAGE';



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


const dilogsReducer = (state = initialState, action: ActionsType): initialStateType => {
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


export const actions = {
    SendMessageCreatorActionType: (newMessageBody: string) => ({type: ADD_MESSAGE, newMessageBody} as const )

}


export default dilogsReducer;

export type initialStateType = typeof initialState;
type ActionsType = InferActionTypes<typeof actions>