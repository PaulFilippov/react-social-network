import {instance, APIResponseType, ResultCodeEnum, ResultCodeEnumForCaptchaEnum} from "./api";

//2 типа для запросов, которые делает authAPI
type MeResponceDataType = {
    id: number,
    email: string,
    login: string
}
type LoginResponceType = {
    userId: number
}



export const authAPI = {

    me() {
        return instance.get<APIResponseType<MeResponceDataType>>(`auth/me`).then(res => res.data);
    },
    login(email: string, password: string, rememberMe = false, captcha: null | string = null) {
        return instance.post<APIResponseType<LoginResponceType, ResultCodeEnum | ResultCodeEnumForCaptchaEnum>>(`auth/login`, {email, password, rememberMe, captcha})
            .then(res => res.data);
    },
    logout() {
        return instance.delete(`auth/login`);
    }

}