import React from "react";
import styleClasses from './Users.module.css';
import userDefaultPhoto from '../../assets/images/snoop.png'
import {NavLink} from "react-router-dom";
import Paginator from "../common/Paginator/Paginator";


let User = ({user, ...props}) => {
    return (<div>
                <span>
                    <div>
                        <NavLink to={'/profile/' + user.id}>
                            <img src={user.photos.small ? user.photos.small : userDefaultPhoto}
                                 className={styleClasses.userPhoto}/>
                        </NavLink>
                    </div>
                    <div>
                        {user.followed
                            ? <button disabled={props.followingInProgress
                                .some(id => id === user.id)}
                                      onClick={() => {
                                          props.unFollow(user.id);
                                      }}>Unfollow</button>
                            : <button disabled={props.followingInProgress
                                .some(id => id === user.id)}
                                      onClick={() => {
                                          props.follow(user.id);
                                      }}>Follow</button>}
                    </div>
                </span>
                    <span>
                        <span>
                            <div>{user.name}</div>
                            <div>{user.status}</div>
                        </span>
                        <span>
                            <div>{"user.location.city"}</div>
                            <div>{"user.location.country"}</div>
                        </span>
                    </span>
                </div>)
}


export default User;