import React from "react";
import styleClasses from './UserPosts.module.css';
import Post from "./Post/Post";
import {Field, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../../../utils/validators/validators";
import {TextArea} from "../../common/FormsControls/FormsControls";


let maxLength10 = maxLengthCreator(10);


let AddNewPostForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field name="newPostText"
                       component={TextArea}
                       validate={[required, maxLength10]}
                       placeholder="Enter post message"/>
            </div>
            <div>
                <button>Add post</button>
            </div>
        </form>
    );
}


let AddNewPostFormRedux = reduxForm({
    form: "profileAddNewPostForm"
})(AddNewPostForm);


const UserPosts = React.memo(props => {
    let postsElements = [...props.posts]
        .reverse()
        .map(p => <Post key={p.id}
                        message={p.message}
                        likesCount={p.likesCount}/>);

    let onAddPost = (values) => {
        props.addPost(values.newPostText);
    };

    return (
        <div className={styleClasses.postsBlock}>
            <h3> My posts </h3>
            <AddNewPostFormRedux onSubmit={onAddPost}/>
            <div className={styleClasses.posts}>
                {postsElements}
            </div>
        </div>
    );
});


export default UserPosts;