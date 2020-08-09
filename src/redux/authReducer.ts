import {ResultCodeEnum, ResultCodeEnumForCaptchaEnum} from "../api/api";
import {stopSubmit} from "redux-form";
import {authAPI} from "../api/authApi";
import {securityAPI} from "../api/securityApi";
import {BaseThunkType, InferActionTypes} from "./reduxStore";
import {Action} from "redux";


const SET_USER_DATA = 'SN/auth/social-network/auth/SET_USER_DATA';
const GET_CAPTCHA_URL_SUCCESS = 'SN/auth/social-network/auth/GET_CAPTCHA_URL_SUCCESS';



let initialState = {
    userId: null as (number | null),
    login: null as string | null,
    email: null as string | null,
    isAuth: false,
    captchaUrl: null as string | null
};

const authReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case SET_USER_DATA:
        case GET_CAPTCHA_URL_SUCCESS:
            return {
                ...state,
                ...action.payload
            };
        default:
            return state;
    }
}

export const actions = {
    setAuthUserData: (userId: number | null, email: string | null, login: string | null, isAuth: boolean) => ({
        type: SET_USER_DATA,
        payload: {userId, email, login, isAuth}
    } as const),
    getCaptchaUrlSuccess: (captchaUrl: string): GetCaptchaUrlSuccessActionType=> ({
        type: GET_CAPTCHA_URL_SUCCESS,
        payload: {captchaUrl}
    } as const)
}

export type GetCaptchaUrlSuccessActionType = {
    type: typeof GET_CAPTCHA_URL_SUCCESS,
    payload: { captchaUrl: string }
}

export const getAuthUserData = (): ThunkType => async (dispatch) => {
    let meData = await authAPI.me();
    if (meData.resultCode === ResultCodeEnum.Success) {
        let {id, login, email} = meData.data;
        dispatch(actions.setAuthUserData(id, email, login, true));
    }
}


export const login = (email: string, password: string, rememberMe: boolean, captcha: string): ThunkType => async (dispatch) => {
    let LoginData = await authAPI.login(email, password, rememberMe, captcha);
    if (LoginData.resultCode === ResultCodeEnum.Success) {
        dispatch(getAuthUserData());
    } else {
        if (LoginData.resultCode === ResultCodeEnumForCaptchaEnum.CaptchaIsRequired) {
            dispatch(getCaptchaURL());
        }
        let message = LoginData.messages.length > 0
            ? LoginData.messages[0]
            : "Some error";
        dispatch(stopSubmit("login", {_error: message}));
    }
}


export const getCaptchaURL = (): ThunkType => async (dispatch: any) => {
    const data = await securityAPI.getCaptchaUrl();
    const captchaUrl = data.url;
    dispatch(actions.getCaptchaUrlSuccess(captchaUrl))
}


export const logout = (): ThunkType => async (dispatch: any) => {
    let responce = await authAPI.logout();
    if (responce.data.resultCode === 0) {
        dispatch(actions.setAuthUserData(null, null, null, false));
    }
}

export default authReducer;

export type InitialStateType = typeof initialState
type ActionsType = InferActionTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType | ReturnType<typeof stopSubmit>>