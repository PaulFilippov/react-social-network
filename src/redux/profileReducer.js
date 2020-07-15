import {profileAPI, usersAPI} from "../api/api";

const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';

let initialState =  {
    posts: [
        {id: 1, message: "hiiii", likesCount: 11},
        {id: 2, message: "huuuuuuu", likesCount: 13},
    ],
    newPostText: '',
    profile: null,
    status: ""
};

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST:
            return  {
                ...state,
                newPostText: '',
                posts: [...state.posts, {id: 5, message: state.newPostText, likesCount: 0}],
            };
        case UPDATE_NEW_POST_TEXT:
            return  {
                ...state,
                newPostText: action.newText
            };
        case SET_USER_PROFILE:
            return  {
                ...state,
                profile: action.profile
            };
        case SET_STATUS:
            return  {
                ...state,
                status: action.status
            };
        default:
            return state;
    }
}

export const addPost = () => ({type: ADD_POST})
const setUserProfile = (profile) => ({type: SET_USER_PROFILE, profile})
const setStatus = (status) => ({type: SET_STATUS, status})
export const updateNewPostText = (text) => ({
    type: UPDATE_NEW_POST_TEXT,
    newText: text
})

export const getUserProfile = (userId) => (dispatch) => {

    return usersAPI.getProfile(userId).then(responce => {
        dispatch(setUserProfile(responce.data));
    });

}

export const getStatus = (userId) => (dispatch) => {

    return profileAPI.getStatus(userId)
        .then(responce => {
        dispatch(setStatus(responce.data));
    });

}

export const updateStatus = (status) => (dispatch) => {

    return profileAPI.updateStatus(status)
        .then(responce => {
            if (responce.data.resultCode === 0) {
                dispatch(setStatus(status));
            }
    });

}


export default profileReducer;