import React from "react";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import UserPostsContainer from "./Posts/UserPostsContainer";

const Profile = (props) => {
    return (
        <div>
            <ProfileInfo profile={props.profile}
                         status={props.status}
                         updateStatus={props.updateStatus}/>
            <UserPostsContainer />
        </div>
    );
}

export default Profile;