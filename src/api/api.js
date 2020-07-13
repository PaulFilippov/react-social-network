import * as axios from "axios";


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
    follow(userId){
        return instance.post(`follow/${userId}`)
    },
    unFollow(userId) {
        return instance.delete(`follow/${userId}`)
    },

    getProfile (userId) {
        return instance.get(`profile/${userId}`);
    }

}


export const authAPI = {

    me() {
       return instance.get(`auth/me`)
    }

}