import React from "react";
import classes from './MyPosts.module.css';
import Post from "./Post/Post";

const MyPosts = () => {
    return (
        <div>
            My posts
            <div>
                <textarea></textarea>
                <button>Add post</button>

            </div>
            <div className={classes.posts}>
                <Post message='fuck you' likeCounts='12'/>
                <Post message="firts post" likeCounts='1'/>
            </div>
        </div>
    );
}

export default MyPosts;