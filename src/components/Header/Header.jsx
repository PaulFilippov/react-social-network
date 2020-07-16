import React from "react";
import styleClasses from './Header.module.css';
import {NavLink} from "react-router-dom";

const Header = (props) => {
    return (
        <header className={styleClasses.header} >
            <img src='https://cdn.tutsplus.com/vector/uploads/legacy/qt/2012_QT/qt_78_logo_maker/final.jpg'/>

            <div className={styleClasses.loginBlock}>
                { props.isAuth
                    ? <div>{props.login} - <button onClick={props.logout}>Log out</button></div>
                    : <NavLink to={'/login'}>Login</NavLink> }
            </div>
        </header>
    );
}

export default Header;