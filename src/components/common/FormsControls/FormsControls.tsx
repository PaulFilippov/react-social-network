import React, {ReactComponentElement} from "react";
import styleClasses from "./FormControls.module.css";
import {FieldValidatorType, required} from "../../../utils/validators/validators";
import {Field, WrappedFieldMetaProps, WrappedFieldProps} from "redux-form";


// type FormControlPropsType = {
//     meta: {
//         touched: boolean,
//         error: string
//     },
//     children: React.ReactNode,
// }
// type FormControlType = (params: FormControlPropsType) => React.ReactNode;

type FormControlPropsType = {
    meta: WrappedFieldMetaProps
}

const FormControl: React.FC<FormControlPropsType> = ({meta: {touched, error}, children}) => {
    const hasError = touched && error;
    return (
        <div className={styleClasses.formControl + " " + (hasError ? styleClasses.error : "")}>
            <div>
                {children}
            </div>
            {hasError && <span>{error}</span>}
        </div>
    );
}



export const TextArea: React.FC<WrappedFieldProps> = (props) => {
    // const {input, meta, child, ...restProps} = props;
    const {input, meta, children, ...restProps} = props;
    return <FormControl {...props}>
        <textarea {...input} {...restProps}/>
    </FormControl>
}

export const Input: React.FC<WrappedFieldProps> = (props) => {
    // const {input, meta, child, ...restProps} = props;
    const {input, meta, children, ...restProps} = props;
    return <FormControl {...props}>
        <input {...input} {...restProps}/>
    </FormControl>
}


export function createField<FormCaseType extends string> (placeholder: string | undefined,
                            validators: Array<FieldValidatorType>,
                            name: FormCaseType,
                            component: React.FC<WrappedFieldProps>,
                            props={},
                            text="") {
    return <div>
        <Field placeholder={placeholder}
               validate={validators}
               name={name}
               component={component}
               {...props}
        /> {text}
    </div>
}
