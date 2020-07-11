import React from "react";
import styleClasses from './Navbar.module.css';
import {NavLink} from "react-router-dom";

const Navbar = () => {
    return (
        <nav className={styleClasses.nav}>
            <div className={styleClasses.item}>
                <NavLink to="/profile" activeClassName={styleClasses.active}>Profile</NavLink>
            </div>
            <div className={styleClasses.item}>
                <NavLink to="/dialogs" activeClassName={styleClasses.active}>Messages</NavLink>
            </div>
            <div className={styleClasses.item}>
                <NavLink to="/users" activeClassName={styleClasses.active}>Users</NavLink>
            </div>
            <div className={styleClasses.item}>
                <a>News</a>
            </div>
            <div className={styleClasses.item}>
                <a>Music</a>
            </div>
            <div className={styleClasses.item}>
                <a>Settings</a>
            </div>
        </nav>
    );
}

export default Navbar;