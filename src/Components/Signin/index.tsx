import { CircularProgress} from "@mui/material";
//import {Redirect} from "react-router-dom";

import {firebase} from "../../firebase.tsx";
import {useState} from "react";


import {useFormik} from "formik";
import * as Yup from "yup";
//import { PinDropSharp } from '@material-ui/icons';
//import {Simulate} from "react-dom/test-utils";
//import submit = Simulate.submit;
//import error = Simulate.error;

export const SignIn = (props: any) => {
    const [loading, setLoading] = useState(false)
    const formik = useFormik({
        initialValues: {
            email:'',
            password: ''
        },
        validationSchema: Yup.object({
            email:Yup.string()
                .email('Invalid email address')
                .required('The email is required'),
            password: Yup.string()
                .required('The password is required')
        }),
        onSubmit: (values) => {
            setLoading(true)
            submitForm(values)
        }
    })

    const submitForm = (values: any) => {
        firebase.auth()
            .signInWithEmailAndPassword(
                values.email,
                values.password
            ).then(()=>{
            // show success toast
            props.history.push('/dashboard');
        }).catch((error: any)=>{
            setLoading(false);
            alert(error)
            /// show toasts
        })
    }


    return(
        <div className="container">
            <div className="signin_wrapper" style={{margin: '100px'}}>
                <form onSubmit={formik.handleSubmit}>
                    <h2>Please login</h2>
                    <input
                        name= 'email'
                        placeholder= 'Email'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email}
                    />

                    {formik.touched.email && formik.errors.email
                        ?   <div className="error_label">{formik.errors.email}</div>
                        :   null
                    }

                    <input
                        name= 'password'
                        type= 'Password'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.password}
                    />
                    {formik.touched.password && formik.errors.password
                        ?   <div className="error_label">{formik.errors.password}</div>
                        :   null
                    }

                    {loading
                        ? <CircularProgress color='secondary' className='progress'/>
                        : <button type="submit">Log in</button>
                    }
                </form>
            </div>
        </div>
    )
}