import {authAPI, ResultCodeEnum, ResultCodeEnumForCaptcha, securityAPI} from "../api/api";
import {stopSubmit} from "redux-form";


const SET_USER_DATA = 'social-network/auth/SET_USER_DATA';
const GET_CAPTCHA_URL_SUCCESS = 'social-network/auth/GET_CAPTCHA_URL_SUCCESS';



let initialState = {
    id: null as (number | null),
    login: null as string | null,
    email: null as string | null,
    isAuth: false,
    captchaUrl: null as string | null
};

export type InitialStateType = typeof initialState

const authReducer = (state = initialState, action: any): InitialStateType => {
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

type SetAuthUserDataActionPayloadType = {
    userId: number | null,
    email: string | null,
    login: string | null,
    isAuth: boolean
}

type SetAuthUserDataActionType = {
    type: typeof SET_USER_DATA,
    payload: SetAuthUserDataActionPayloadType
}

export const setAuthUserData = (userId: number | null, email: string | null, login: string | null, isAuth: boolean): SetAuthUserDataActionType => ({
    type: SET_USER_DATA,
    payload: {userId, email, login, isAuth}
});

export type GetCaptchaUrlSuccessActionType = {
    type: typeof GET_CAPTCHA_URL_SUCCESS,
    payload: { captchaUrl: string }
}

export const getCaptchaUrlSuccess = (captchaUrl: string): GetCaptchaUrlSuccessActionType=> ({
    type: GET_CAPTCHA_URL_SUCCESS,
    payload: {captchaUrl}
});


export const getAuthUserData = () => async (dispatch: any) => {
    let meData = await authAPI.me();
    if (meData.resultCode === ResultCodeEnum.Success) {
        let {id, login, email} = meData.data;
        dispatch(setAuthUserData(id, email, login, true));
    }
}


export const login = (email: string, password: string, rememberMe: boolean, captcha: string) => async (dispatch: any) => {
    let LoginData = await authAPI.login(email, password, rememberMe, captcha);
    if (LoginData.resultCode === ResultCodeEnum.Success) {
        dispatch(getAuthUserData());
    } else {
        if (LoginData.resultCode === ResultCodeEnumForCaptcha.CaptchaIsRequired) {
            dispatch(getCaptchaURL());
        }

        let message = LoginData.messages.length > 0
            ? LoginData.messages[0]
            : "Some error";
        dispatch(stopSubmit("login", {_error: message}));
    }
}


export const getCaptchaURL = () => async (dispatch: any) => {

    const responce = await securityAPI.getCaptchaUrl();
    const captchaUrl = responce.data.url;

    dispatch(getCaptchaUrlSuccess(captchaUrl))

}


export const logout = () => async (dispatch: any) => {
    let responce = await authAPI.logout();
    if (responce.data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false));
    }
}



export default authReducer;