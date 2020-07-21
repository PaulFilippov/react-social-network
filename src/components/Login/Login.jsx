import React from "react";
import {Field, reduxForm} from "redux-form";
import {createField, Input} from "../common/FormsControls/FormsControls";
import {required} from "../../utils/validators/validators";
import {connect} from "react-redux";
import {login} from "../../redux/authReducer";
import {Redirect} from "react-router-dom";
import styleClasses from "../common/FormsControls/FormControls.module.css"


const LoginForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            {/*{createField("Email", [required], "email", Input)}*/}
            {/*{createField("Password", [required], "password", Input, {type: "password"})}*/}
            {/*{createField(null, [], "rememberMe", Input, {type: "checkbox"}, "remember me")}*/}

            <div>
                <Field placeholder={"Email"} name={"email"}
                       validate={[required]}
                       component={Input}/>
            </div>
            <div>
                <Field placeholder={"Password"} name={"password"} type={"password"}
                       validate={[required]}
                       component={Input}/>
            </div>
            <div>
                <Field component={Input} name={"rememberMe"} type={"checkbox"}/> remember me
            </div>

            {props.error &&
            <div className={styleClasses.formSummaryError}>
                {props.error}
            </div>
            }
            <div>
                <button>Login</button>
            </div>
        </form>
    );
}


const LoginReduxForm = reduxForm({
    form: 'login'
})(LoginForm);


const Login = (props) => {
    const onSubmit = (formData) => {
        props.login(formData.email, formData.password, formData.rememberMe);
    }

    if (props.isAuth) {
        return <Redirect to={"/profile"}/>
    }

    return <div>
        <h1>LOGIN</h1>
        <LoginReduxForm onSubmit={onSubmit}/>
    </div>
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth
})


export default connect(mapStateToProps, {login})(Login);
