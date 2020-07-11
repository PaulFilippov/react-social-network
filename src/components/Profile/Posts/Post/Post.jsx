import React from "react";
import styleClasses from './Post.module.css';

const Post = (props) => {
    return (
        <div className={styleClasses.item}>
            <img src='https://am22.mediaite.com/tms/cnt/uploads/2020/03/trump-coronavirus-face-touch.jpg'/>
            {props.message}
            <div>
                <span>like</span> {props.likesCount}
            </div>
        </div>
    );
}

export default Post;