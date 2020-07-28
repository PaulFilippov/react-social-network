import React from "react";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import UserPostsContainer from "./Posts/UserPostsContainer";

const Profile = (props) => {
    return (
        <div>
            <ProfileInfo profile={props.profile}
                         status={props.status}
                         updateStatus={props.updateStatus}
                         isOwner={props.isOwner}
                         savePhoto={props.savePhoto}
                         saveProfile={props.saveProfile}
            />
            <UserPostsContainer />
        </div>
    );
}

export default Profile;