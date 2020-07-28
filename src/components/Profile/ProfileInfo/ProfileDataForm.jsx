import React, {useState} from "react";
import {createField, Input, TextArea} from "../../common/FormsControls/FormsControls";
import {reduxForm} from "redux-form";
import styleClasses from './ProfileInfo.module.css';
import styleFormControls from '../../common/FormsControls/FormControls.module.css';

const ProfileDataForm = ({handleSubmit, profile, error}) => {
    return <form onSubmit={handleSubmit}>
        <button>save</button>
        {error &&
        <div className={styleFormControls.formSummaryError}>
            {error}
        </div>
        }
        <div>
            <b>Full name: </b> {createField("Full name", [], "fullName", Input)}
        </div>
        <div>
            <b>Looking for a job: </b> {createField("Full name", [], "lookingForAJob", Input, {type: "checkbox"})}
        </div>
        <div>
            <b>My professional skills: </b>
            {createField("My professional skills", [], "lookingForAJobDescription", TextArea)}
        </div>
        <div>
            <b>About me: </b>
            {createField("About me", [], "aboutMe", TextArea)}
        </div>
        <div>
            <b>Contacts: </b>{Object.keys(profile.contacts).map(key => {
            return <div key={key} className={styleClasses.contact}>
            <b>{key}: {createField(key, [], "contacts."+key, Input)}</b>
            </div>
        })}
        </div>
    </form>
}

const ProfileDataFormReduxForm = reduxForm({form: "edit-profile"})(ProfileDataForm);

export default ProfileDataFormReduxForm;