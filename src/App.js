import React from 'react';
import './App.css';
import {Route} from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import UsersContainer from "./components/Users/UsersContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";


function App() {
    return (
            <div className='app-wrapper'>
                <HeaderContainer />
                <Navbar />
                <div class='app-wrapper-content'>
                    <Route path='/dialogs'
                           render={ () => <DialogsContainer/> }
                    />
                    <Route path='/profile/:userId?'
                           render={ () => <ProfileContainer/> }
                    />
                    <Route path='/users'
                           render={ () => <UsersContainer /> }
                    />
                </div>
            </div>
    );
}

export default App;
