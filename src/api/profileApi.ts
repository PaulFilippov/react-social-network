import {PhotosType, ProfileType} from "../types/Types";
import {instance, APIResponseType} from "./api";


type SavePhotoResponceDataType = {
    photos: PhotosType
}


export const profileAPI = {

    getProfile(userId: number) {
        return instance.get<ProfileType>('profile/' + userId)
            .then(res => res.data);
    },
    getStatus(userId: number) {
        return instance.get('profile/status/' + userId)
            //.then(res => res.data);
    },
    updateStatus(status: string) {
        return instance.put<APIResponseType>('profile/status', {status: status})
            .then(res => res.data);
    },
    savePhoto(photoFile: File) {
        const formData = new FormData();
        formData.append("image", photoFile);
        return instance.put<APIResponseType<SavePhotoResponceDataType>>('profile/photo', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(res => res.data);
    },
    saveProfile(profile: ProfileType) {
        return instance.put<APIResponseType>('profile', profile)
            .then(res => res.data);
    }
}