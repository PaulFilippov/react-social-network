import React, {useState} from "react";
import styleClasses from './ProfileInfo.module.css';
import Preloader from "../../common/Preloader/Preloader";
import defaultUserPhoto from "../../../assets/images/snoop.png";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import ProfileDataForm from "./ProfileDataForm";

const ProfileInfo = ({profile, savePhoto, isOwner, status, updateStatus, saveProfile}) => {


    let [editMode, setEditMode] = useState(false);

    if (!profile) {
        return <Preloader/>
    }


    const onMainPhotoSelected = (e) => {
        if (e.target.files.length) {
            savePhoto(e.target.files[0]);
        }
    }

    // архитектурно аснхронщину тут лепить нельзя, в конце 97 урока инфа про это
    const onSubmit = (formData) => {
        saveProfile(formData).then(
            () => {
                setEditMode(false);
            }
        );
    }


    return (
        <div>
            <div className={styleClasses.descriptionBlock}>
                <img src={profile.photos.large || defaultUserPhoto} className={styleClasses.mainPhoto}/>
                {isOwner && <input type={"file"} onChange={onMainPhotoSelected}/>}

                {editMode
                    ? <ProfileDataForm initialValues={profile}
                                       profile={profile}
                                       onSubmit={onSubmit}/>
                    : <ProfileData profile={profile}
                                   goToEditMode={() => {
                                       setEditMode(true)
                                   }}
                                   isOwner={isOwner}/>}

                <ProfileStatusWithHooks status={status} updateStatus={updateStatus}/>
            </div>
        </div>
    );
}


const ProfileData = ({profile, isOwner, goToEditMode}) => {
    return <div>
        {isOwner && <div>
            <button onClick={goToEditMode}>edit</button>
        </div>}
        <div>
            <b>Full name: </b> {profile.fullName ? profile.fullName : "no"}
        </div>
        <div>
            <b>Looking for a job: </b> {profile.lookingForAJob ? "yes" : "no"}
        </div>
        {profile.lookingForAJob &&
        <div>
            <b>My professional
                skills: </b> {profile.lookingForAJobDescription ? profile.lookingForAJobDescription : "no"}
        </div>
        }
        <div>
            <b>About me: </b>{profile.aboutMe}
        </div>
        <div>
            <b>Contacts: </b>{Object.keys(profile.contacts).map(key => {
            return <Contact key={key} contactTitle={key}
                            contactValue={profile.contacts[key]}
            />
        })}
        </div>
    </div>
}


const Contact = ({contactTitle, contactValue}) => {
    return <div className={styleClasses.contact}>
        <b>{contactTitle}</b>: {contactValue}
    </div>
}


export default ProfileInfo;