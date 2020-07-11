import React from "react";
import styleClasses from './UserPosts.module.css';
import Post from "./Post/Post";


const UserPosts = (props) => {

    let postsElements = props.posts
        .map(p => <Post message={p.message} likesCount={p.likesCount}/>);

    let onAddPost = () => {
        props.addPost();
    };

    let onPostChange = (event)=> {
        let text = event.target.value;
        props.updateNewPostText(text);
    };

    return (
        <div className={styleClasses.postsBlock}>
            <h3> My posts </h3>
            <div>
                <div>
                    <textarea onChange={onPostChange}
                              value={props.newPostText}/>
                </div>
                <div>
                    <button onClick={onAddPost}>Add post</button>
                </div>
            </div>
            <div className={styleClasses.posts}>
                {postsElements}
            </div>
        </div>
    );
}

export default UserPosts;