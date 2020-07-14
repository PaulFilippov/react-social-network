import React from "react";
import styleClasses from './ProfileInfo.module.css';
import Preloader from "../../Preloader/Preloader";
import defaultImg from "../../../assets/images/snoop.png";
import ProfileStatus from "./ProfileStatus";

const ProfileInfo = (props) => {

    if (!props.profile) {
        return <Preloader />
    }

    let imageProfile;
    if (props.profile.photos.large) {
        imageProfile = props.profile.photos.large;
    } else if (props.profile.photos.small) {
        imageProfile = props.profile.photos.small;
    } else {
        imageProfile = defaultImg;
    }

    return (
        <div>
            <div className={styleClasses.descriptionBlock}>
                    <img src={imageProfile} />
                    <ProfileStatus status={"Hello"}/>
                <div>{props.profile.aboutMe}</div>
            </div>
        </div>
    );
}

export default ProfileInfo;