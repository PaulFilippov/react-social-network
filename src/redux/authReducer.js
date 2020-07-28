import {authAPI, securityAPI} from "../api/api";
import {stopSubmit} from "redux-form";



const SET_USER_DATA = 'social-network/auth/SET_USER_DATA';
const GET_CAPTCHA_URL_SUCCESS = 'social-network/auth/GET_CAPTCHA_URL_SUCCESS';



let initialState = {
    id: null,
    login: null,
    email: null,
    isAuth: false,
    captchaUrl: null
};



const authReducer = (state = initialState, action) => {
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



export const setAuthUserData = (userId, email, login, isAuth) => ({
    type: SET_USER_DATA,
    payload: {userId, email, login, isAuth}
});

export const getCaptchaUrlSuccess = (captchaUrl) => ({
    type: GET_CAPTCHA_URL_SUCCESS,
    payload: {captchaUrl}
});



export const getAuthUserData = () => async (dispatch) => {
    let responce = await authAPI.me();
    if (responce.data.resultCode === 0) {
        let {id, login, email} = responce.data.data;
        dispatch(setAuthUserData(id, email, login, true));
    }
}

export const login = (email, password, rememberMe, captcha) => async (dispatch) => {

    let responce = await authAPI.login(email, password, rememberMe, captcha);
    if (responce.data.resultCode === 0) {
        dispatch(getAuthUserData());
    } else {
        if (responce.data.resultCode === 10) {
            dispatch(getCaptchaURL());
        }

        let message = responce.data.messages.length > 0
            ? responce.data.messages[0]
            : "Some error";
        dispatch(stopSubmit("login", {_error: message}));
    }
}

export const getCaptchaURL = () => async (dispatch) => {

    const responce = await securityAPI.getCaptchaUrl();
    const captchaUrl = responce.data.url;

    dispatch(getCaptchaUrlSuccess(captchaUrl))

}

export const logout = () => async (dispatch) => {
    let responce = await authAPI.logout();
    if (responce.data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false));
    }
}


export default authReducer;