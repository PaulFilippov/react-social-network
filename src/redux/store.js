import profileReducer from "./profileReducer";
import dialogsReducer from "./dialogsReducer";
import sidebarReducer from "./sidebarReducer";


let store = {
    _state: {
        profilePage: {
            posts: [
                {id: 1, message: "hiiii", likesCount: 11},
                {id: 2, message: "huuuuuuu", likesCount: 13},
            ],
            newPostText: '',
        },
        dialogsPage: {
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
        },
        sidebar: {

        }
    },
    _callSubscriber() {
        console.log('state changed');
    },
    getState() {
        return this._state;
    },
    subscribe(observer) {
        this._callSubscriber = observer;
    },

    dispatch(action) {
        this._state.profilePage = profileReducer(this._state.profilePage, action);
        this._state.dialogsPage = dialogsReducer (this._state.dialogsPage, action);
        this._state.sidebar = sidebarReducer (this._state.sidebar, action);
        this._callSubscriber(this._state);
    },
}


export default store;

