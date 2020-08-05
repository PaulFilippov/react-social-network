import React, {Suspense} from 'react';
import './App.css';
import {BrowserRouter, Redirect, Route, Switch, withRouter} from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
// import DialogsContainer from "./components/Dialogs/DialogsContainer";
//import UsersContainer from "./components/Users/UsersContainer";
// import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import LoginPage from "./components/Login/Login";
import {connect, Provider} from "react-redux";
import {compose} from "redux";
import {initializeApp} from "./redux/appReducer";
import Preloader from "./components/common/Preloader/Preloader";
import store from "./redux/reduxStore";

const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));
const UsersContainer = React.lazy(() => import('./components/Users/UsersContainer'));

class App extends React.Component {


    catchAllUnhandledErrors = (promiseRejectionEvent) => {
        alert("Some erroe occured");
        console.error(promiseRejectionEvent);
    }

    componentDidMount() {
        this.props.initializeApp();
        window.addEventListener("unhandledrejection", this.catchAllUnhandledErrors);
    }

    componentWillUnmount() {
        window.removeEventListener("unhandledrejection", this.catchAllUnhandledErrors)
    }


    render() {
        if (!this.props.initialized) {
            return <Preloader/>
        }

        return (
            <div className='app-wrapper'>
                <HeaderContainer/>
                <Navbar/>
                <div class='app-wrapper-content'>
                    <Suspense fallback={<div>Loading...</div>}>
                        <Switch>
                            <Route exact path='/'>
                                <Redirect to='/profile'/>
                            </Route>
                            <Route path='/dialogs'
                                   render={() => <DialogsContainer/>}
                            />
                            <Route path='/profile/:userId?'
                                   render={() => <ProfileContainer/>}
                            />
                            <Route path='/users'
                                   render={() => <UsersContainer pageTitle={"All users"}/>}
                            />
                            <Route path='/login'
                                   render={() => <LoginPage/>}
                            />
                        </Switch>
                    </Suspense>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    initialized: state.app.initialized
});

let AppContainer = compose(
    withRouter,
    connect(mapStateToProps, {initializeApp}))(App);

let SocialNetworkApp = (props) => {
    return <React.StrictMode>
        <BrowserRouter basename={process.env.PUBLIC_URL}>
            <Provider store={store}>
                <AppContainer/>
            </Provider>
        </BrowserRouter>
    </React.StrictMode>
}

export default SocialNetworkApp;