import React from "react";
import classes from './Post.module.css';

const Post = (props) => {
    return (
        <div className={classes.posts}>
            <div className={classes.item}>
                <img
                    src='https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSjZL3NYb0b5GBCrZTQVf1cJbcpm0pbY5IDjDqNqbmlAc4S-1TW'/>
                { props.message }
                <div>
                    <span>like: { props.likesCounts }</span>
                </div>
            </div>
        </div>
    );
}

export default Post;