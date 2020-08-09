import axios from "axios";
import {UserType} from "../types/Types";


export const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        "API-KEY": "48080e8d-2364-4c0b-a823-b3eaa8a869a4"
    }
});

export enum ResultCodeEnum {
    Success = 0,
    Error = 1
}

export enum ResultCodeEnumForCaptchaEnum {
    CaptchaIsRequired = 10
}

export type GetItemsType = {
    items: Array<UserType>,
    totalCount: number,
    error: string | null
}
//D = {} по умолчанию пустой тип (не значение)
export type APIResponseType<D = {}, RC = ResultCodeEnum> = {
    data: D
    messages: Array<string>
    resultCode: RC
}