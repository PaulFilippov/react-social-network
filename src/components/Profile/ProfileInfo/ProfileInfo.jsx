import React from "react";
import styleClasses from './ProfileInfo.module.css';
import Preloader from "../../common/Preloader/Preloader";
import defaultUserPhoto from "../../../assets/images/snoop.png";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";

const ProfileInfo = (props) => {

    if (!props.profile) {
        return <Preloader />
    }

const onMainPhotoSelected = (e) => {
        if (e.target.files.length) {
            props.savePhoto(e.target.files[0]);
        }
}

    return (
        <div>
            <div className={styleClasses.descriptionBlock}>
                    <img src={props.profile.photos.large || defaultUserPhoto} className={styleClasses.mainPhoto}/>
                { props.isOwner && <input type={"file"} onChange={onMainPhotoSelected} /> }
                    <ProfileStatusWithHooks status={props.status} updateStatus={props.updateStatus}/>
                <div>{props.profile.aboutMe}</div>
            </div>
        </div>
    );
}

export default ProfileInfo;