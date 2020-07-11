import React from "react";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import UserPostsContainer from "./Posts/UserPostsContainer";

const Profile = (props) => {
    return (
        <div>
            <ProfileInfo profile={props.profile}/>
            <UserPostsContainer />
        </div>
    );
}

export default Profile;