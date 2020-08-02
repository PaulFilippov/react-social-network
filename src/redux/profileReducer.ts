import {profileAPI, usersAPI} from "../api/api";
import {stopSubmit} from "redux-form";
import {PhotosType, PostType, ProfileType} from "../types/Types";

const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';
const DELETE_POST = 'DELETE_POST';
const SAVE_PHOTO_SUCCESS = 'SAVE_PHOTO_SUCCESS';



let initialState = {
    posts: [
        {id: 1, message: "hiiii", likesCount: 11},
        {id: 2, message: "huuuuuuu", likesCount: 13},
    ] as Array<PostType>,
    profile: null as ProfileType | null,
    status: "",
    // newPostText: ""
};
export type InitialStateType = typeof initialState;

const profileReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case ADD_POST:
            return {
                ...state,
                posts: [...state.posts, {id: 5, message: action.newPostText, likesCount: 0}],
                // newPostText: ""
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
                profile: {...state.profile, photos: action.photos} as ProfileType
                // profile: {...state, (profile: {...state.profile ,photos: action.photos}) as ProfileType}
            };
        default:
            return state;
    }
}

type AddPostACType = {
    type: typeof ADD_POST,
    newPostText: string
}
export const addPostAC = (newPostText: string): AddPostACType => ({type: ADD_POST, newPostText})

type SetUserProfileACType = {
    type: typeof SET_USER_PROFILE,
    profile: ProfileType
}
export const setUserProfileAC = (profile: ProfileType): SetUserProfileACType => ({type: SET_USER_PROFILE, profile})

type SetStatusACType = {
    type: typeof SET_STATUS,
    status: string
}
export const setStatusAC = (status: string): SetStatusACType => ({type: SET_STATUS, status})

type DeletePostACType = {
    type: typeof DELETE_POST,
    postId: number
}
export const deletePostAC = (postId: number): DeletePostACType => ({type: DELETE_POST, postId})

type SavePhotoSuccessAC = {
    type: typeof SAVE_PHOTO_SUCCESS,
    photos: PhotosType
}
export const savePhotoSuccessAC = (photos: PhotosType): SavePhotoSuccessAC => ({type: SAVE_PHOTO_SUCCESS, photos})



export const getUserProfile = (userId: number) => async (dispatch: any) => {
    let responce = await usersAPI.getProfile(userId);
    dispatch(setUserProfileAC(responce.data));
}

export const getStatus = (userId: number) => async (dispatch: any) => {
    let responce = await profileAPI.getStatus(userId);
    dispatch(setStatusAC(responce.data));
}

export const updateStatus = (status: string) => async (dispatch: any) => {
    try {

        let responce = await profileAPI.updateStatus(status);
        if (responce.data.resultCode === 0) {
            dispatch(setStatusAC(status));
        }
    } catch (e) {
        //
    }
}

export const savePhoto = (file: any) => async (dispatch: any) => {
    let responce = await profileAPI.savePhoto(file);

    if (responce.data.resultCode === 0) {
        dispatch(savePhotoSuccessAC(responce.data.data.photos));
    }
}

export const saveProfile = (profile: ProfileType) => async (dispatch: any, getState: any) => {
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