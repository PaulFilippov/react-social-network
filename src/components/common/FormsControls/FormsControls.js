import React from "react";
import styleClasses from "./FormControls.module.css";

const FormControl = ({input, meta, child, ...props}) => {
    const hasError = meta.touched && meta.error;
    return (
        <div className={styleClasses.formControl + " " + (hasError ? styleClasses.error : "")} >
            <div>
                {props.children}
            </div>
            { hasError && <span>{meta.error}</span> }
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

// export const TextArea = ({input, meta, ...props}) => {
//     const hasError = meta.touched && meta.error;
//     return (
//         <div className={styleClasses.formControl + " " + (hasError ? styleClasses.error : "")} >
//            <div>
//                <textarea {...input} {...props}/>
//            </div>
//             { hasError && <span>{meta.error}</span> }
//         </div>
//     );
// }

// export const Input = ({input, meta, ...props}) => {
//     const hasError = meta.touched && meta.error;
//     return (
//         <div className={styleClasses.formControl + " " + (hasError ? styleClasses.error : "")} >
//             <div>
//                 <input {...input} {...props}/>
//             </div>
//             { hasError && <span>{meta.error}</span> }
//         </div>
//     );
//}