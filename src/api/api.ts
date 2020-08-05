import axios from "axios";
import {ProfileType} from "../types/Types";


const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        "API-KEY": "48080e8d-2364-4c0b-a823-b3eaa8a869a4"
    }
});

export const usersAPI = {

    getUsers(currentPage = 1, pageSize = 10) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(responce => responce.data);
    },
    follow(userId: number) {
        return instance.post('follow/' + userId)
    },
    unFollow(userId: number) {
        return instance.delete('follow/' + userId)
    },

    getProfile(userId: number) {
        console.warn('Obsolete method. Please profileAPI object.')
        return profileAPI.getProfile(userId);
    }

}

export const profileAPI = {

    getProfile(userId: number) {
        return instance.get('profile/' + userId);
    },
    getStatus(userId: number) {
        return instance.get('profile/status/' + userId);
    },
    updateStatus(status: string) {
        return instance.put('profile/status', {status : status});
    },
    savePhoto(photoFile: any){
        const formData = new FormData();
        formData.append("image", photoFile);
        return instance.put('profile/photo', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    },
    saveProfile(profile: ProfileType) {
        return instance.put('profile', profile);
    }
}

export enum ResultCodeEnum {
    Success = 0,
    Error = 1
}

export enum ResultCodeEnumForCaptcha {
    CaptchaIsRequired = 10
}


type MeResponceType = {
    data: { id: number, email: string, login: string }
    resultCode: ResultCodeEnum
    messages: Array<string>
}

type LoginResponceType = {
    data: {
        userId: number
    }
    resultCode: ResultCodeEnum | ResultCodeEnumForCaptcha
    messages: Array<string>
}

export const authAPI = {

    me() {
        return instance.get<MeResponceType>(`auth/me`).then(res => res.data);
    },
    login( email: string, password: string, rememberMe = false, captcha: null | string = null) {
        return instance.post<LoginResponceType>(`auth/login`, { email, password, rememberMe, captcha })
            .then(res => res.data);
    },
    logout() {
        return instance.delete(`auth/login`);
    }

}


export const securityAPI = {

    getCaptchaUrl() {
        return instance.get(`security/get-captcha-url`);
    }

}