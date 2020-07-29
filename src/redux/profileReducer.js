import {profileAPI, usersAPI} from "../api/api";
import {stopSubmit} from "redux-form";

const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';
const DELETE_POST = 'DELETE_POST';
const SAVE_PHOTO_SUCCESS = 'SAVE_PHOTO_SUCCESS';


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
        case SAVE_PHOTO_SUCCESS:
            return {
                ...state,
                profile: { ...state.profile, photos: action.photos }
            };
        default:
            return state;
    }
}

export const addPostAC = (newPostText) => ({type: ADD_POST, newPostText})
export const setUserProfileAC = (profile) => ({type: SET_USER_PROFILE, profile})
export const setStatusAC = (status) => ({type: SET_STATUS, status})
export const deletePostAC = (postId) => ({type: DELETE_POST, postId})
export const savePhotoSuccessAC = (photos) => ({type: SAVE_PHOTO_SUCCESS, photos})

export const getUserProfile = (userId) => async (dispatch) => {
    let responce = await usersAPI.getProfile(userId);
    dispatch(setUserProfileAC(responce.data));
}

export const getStatus = (userId) => async (dispatch) => {
    let responce = await profileAPI.getStatus(userId);
    dispatch(setStatusAC(responce.data));
}

export const updateStatus = (status) => async (dispatch) => {
    try {

        let responce = await profileAPI.updateStatus(status);
        if (responce.data.resultCode === 0) {
            dispatch(setStatusAC(status));
        }
    } catch (e) {
        //
    }
}

export const savePhoto = (file) => async (dispatch) => {
    let responce = await profileAPI.savePhoto(file);

    if (responce.data.resultCode === 0) {
        dispatch(savePhotoSuccessAC(responce.data.data.photos));
    }
}

export const saveProfile = (profile) => async (dispatch, getState) => {
    const userId = getState().auth.userId;
    const responce = await profileAPI.saveProfile(profile);

    if (responce.data.resultCode === 0) {
        dispatch(getUserProfile(userId));
    } else {
        let message = responce.data.messages.length > 0
            ? responce.data.messages[0]
            : "Some error";
        dispatch(stopSubmit("edit-profile", {_error: message}));
        return Promise.reject(message);
        // dispatch(stopSubmit("edit-profile", {"contacts": {"facebook": responce.data.messages[0]} } ));
    }
}

export default profileReducer;