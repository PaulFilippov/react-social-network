import React from "react";
import styleClasses from "./FormControls.module.css";
import {Field} from "redux-form";
import {required} from "../../../utils/validators/validators";

const FormControl = ({input, meta, child, ...props}) => {
    const hasError = meta.touched && meta.error;
    return (
        <div className={styleClasses.formControl + " " + (hasError ? styleClasses.error : "")}>
            <div>
                {props.children}
            </div>
            {hasError && <span>{meta.error}</span>}
        </div>
    );
}

export const TextArea = (props) => {
    const {input, meta, child, ...restProps} = props;
    return <FormControl {...props}>
        <textarea {...input} {...restProps}/>
    </FormControl>
}

export const Input = (props) => {
    const {input, meta, child, ...restProps} = props;
    return <FormControl {...props}>
        <input {...input} {...restProps}/>
    </FormControl>
}

export const createField = (placeholder, validators, name, component, props={}, text="") => (
     <div>
        <Field placeholder={placeholder}
                        validate={validators}
                        name={name}
                        component={component}
                        {...props}
    /> {text}
    </div>
)
