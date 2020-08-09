import {FormAction, stopSubmit} from "redux-form";
import {PhotosType, PostType, ProfileType} from "../types/Types";
import {profileAPI} from "../api/profileApi";
import {BaseThunkType, InferActionTypes} from "./reduxStore";

const ADD_POST = 'SN/PROFILE/ADD-POST';
const SET_USER_PROFILE = 'SN/PROFILE/SET_USER_PROFILE';
const SET_STATUS = 'SN/PROFILE/SET_STATUS';
const DELETE_POST = 'SN/PROFILE/DELETE_POST';
const SAVE_PHOTO_SUCCESS = 'SN/PROFILE/SAVE_PHOTO_SUCCESS';


let initialState = {
    posts: [
        {id: 1, message: "hiiii", likesCount: 11},
        {id: 2, message: "huuuuuuu", likesCount: 13},
    ] as Array<PostType>,
    profile: null as ProfileType | null,
    status: "",
    // newPostText: ""
};

const profileReducer = (state = initialState, action: ActionsType): InitialStateType => {
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


export const actions = {
    addPostAC: (newPostText: string) => ({type: ADD_POST, newPostText} as const),
    setUserProfileAC: (profile: ProfileType) => ({type: SET_USER_PROFILE, profile} as const),
    setStatusAC: (status: string) => ({type: SET_STATUS, status} as const),
    deletePostAC: (postId: number) => ({type: DELETE_POST, postId} as const),
    savePhotoSuccessAC: (photos: PhotosType) => ({type: SAVE_PHOTO_SUCCESS, photos} as const)
}


export const getUserProfile = (userId: number): ThunkType => async (dispatch) => {
    let data = await profileAPI.getProfile(userId);
    dispatch(actions.setUserProfileAC(data));
}

export const getStatus = (userId: number): ThunkType => async (dispatch) => {
    let responce = await profileAPI.getStatus(userId);
    dispatch(actions.setStatusAC(responce.data));
}

export const updateStatus = (status: string): ThunkType => async (dispatch) => {
    try {

        let data = await profileAPI.updateStatus(status);
        if (data.resultCode === 0) {
            dispatch(actions.setStatusAC(status));
        }
    } catch (e) {
        //
    }
}

export const savePhoto = (file: File): ThunkType => async (dispatch) => {
    let data = await profileAPI.savePhoto(file);

    if (data.resultCode === 0) {
        dispatch(actions.savePhotoSuccessAC(data.data.photos));
    }
}

export const saveProfile = (profile: ProfileType): ThunkType => async (dispatch, getState) => {
    const userId = getState().auth.userId;
    const data = await profileAPI.saveProfile(profile);

    if (data.resultCode === 0) {
        if (userId != null){
            dispatch(getUserProfile(userId));
        } else {
            throw new Error("userId can't be null");
        }
    } else {
        let message = data.messages.length > 0
            ? data.messages[0]
            : "Some error";
        dispatch(stopSubmit("edit-profile", {_error: message}));
        return Promise.reject(message);
        // dispatch(stopSubmit("edit-profile", {"contacts": {"facebook": responce.data.messages[0]} } ));
    }
}

export default profileReducer;

export type InitialStateType = typeof initialState;
type ActionsType = InferActionTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType | FormAction>