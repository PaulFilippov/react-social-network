import React from "react";
import {addPost, updateNewPostText} from "../../../redux/profileReducer";
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
        addPost: () => {
            dispatch(addPost());
        },
        updateNewPostText: (text) => {
            dispatch(updateNewPostText(text));
        }
    }
}

const UserPostsContainer = connect(mapStateToProps, mapDispatchToProps)(UserPosts);

export default UserPostsContainer;