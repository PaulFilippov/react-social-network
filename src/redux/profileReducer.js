import {profileAPI, usersAPI} from "../api/api";

const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';
const DELETE_POST = 'DELETE_POST';


let initialState = {
    posts: [
        {id: 1, message: "hiiii", likesCount: 11},
        {id: 2, message: "huuuuuuu", likesCount: 13},
    ],
    profile: null,
    status: ""
};

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST:
            return {
                ...state,
                posts: [...state.posts, {id: 5, message: action.newPostText, likesCount: 0}],
            };
        case SET_USER_PROFILE:
            return {
                ...state,
                profile: action.profile
            };
        case SET_STATUS:
            return {
                ...state,
                status: action.status
            };
        case DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter(p => p.id != action.postId)
            };
        default:
            return state;
    }
}

export const addPostAC = (newPostText) => ({type: ADD_POST, newPostText})
export const setUserProfileAC = (profile) => ({type: SET_USER_PROFILE, profile})
export const setStatusAC = (status) => ({type: SET_STATUS, status})
export const deletePostAC = (postId) => ({type: DELETE_POST, postId})

export const getUserProfile = (userId) => async (dispatch) => {
    let responce = await usersAPI.getProfile(userId);
    dispatch(setUserProfileAC(responce.data));
}

export const getStatus = (userId) => async (dispatch) => {
    let responce = await profileAPI.getStatus(userId);
    dispatch(setStatusAC(responce.data));
}

export const updateStatus = (status) => async (dispatch) => {
    let responce = await profileAPI.updateStatus(status);
    if (responce.data.resultCode === 0) {
        dispatch(setStatusAC(status));
    }
}


export default profileReducer;