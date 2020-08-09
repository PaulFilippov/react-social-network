import {GetItemsType, instance, APIResponseType} from "./api";
import {profileAPI} from "./profileApi";


export const usersApi = {

    getUsers(currentPage = 1, pageSize = 10) {
        return instance.get<GetItemsType>(`users?page=${currentPage}&count=${pageSize}`)
            .then(res => res.data);
    },
    follow(userId: number) {
        return instance.post<APIResponseType>('follow/' + userId)
            .then(res => res.data)
    },
    unFollow(userId: number) {
        return instance.delete('follow/' + userId)
            .then(res => res.data) as Promise<APIResponseType>
    },

    getProfile(userId: number) {
        console.warn('Obsolete method. Please profileAPI object.')
        return profileAPI.getProfile(userId)
    }

}