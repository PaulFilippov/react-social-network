import React from "react";
import {addPost} from "../../../redux/profileReducer";
import UserPosts from "./UserPosts";
import {connect} from "react-redux";


let mapStateToProps = (state) => {
    return {
        posts: state.profilePage.posts,
        newPostText: state.profilePage.newPostText
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        addPost: (newPostText) => {
            dispatch(addPost(newPostText));
        },
    }
}

const UserPostsContainer = connect(mapStateToProps, mapDispatchToProps)(UserPosts);

export default UserPostsContainer;