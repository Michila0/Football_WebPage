import {CircularProgress} from "@mui/material";
//import {Redirect} from "react-router-dom";

import {useFormik} from "formik";
import {useState} from "react";
import * as Yup from "yup";
import {auth} from "../../config/firebase-config";
import {signInWithEmailAndPassword} from "firebase/auth";
import {useNavigate} from "react-router-dom";
//import { PinDropSharp } from '@material-ui/icons';
//import {Simulate} from "react-dom/test-utils";
//import submit = Simulate.submit;
//import error = Simulate.error;

import {showErrorToast, showSuccessToast} from "../utils/tools.tsx";

export const SignIn = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)
    const formik = useFormik({
        initialValues: {
            email: 'michelamax2000610@gmail.com',
            password: '123456'
        },
        validationSchema: Yup.object({
            email: Yup.string()
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
        signInWithEmailAndPassword(auth, values.email, values.password)
            .then((userCredential) => {
                // show success toast
                showSuccessToast('Welcome back !!')

                console.log(userCredential.user.email)
                navigate('/dashboard');
            }).catch((error: any) => {
            setLoading(false);
            /// show toasts
            showErrorToast(error.message)
        })
    }

    // Nipuna Aiya Guide
    // const submitForm2 = async (values: any) => {
    //     try {
    //         const userCredential = await signInWithEmailAndPassword(auth, values.email, values.password)
    //         console.log(userCredential.user.email)
    //         navigate('/dashboard')
    //     } catch (error) {
    //         setLoading(false);
    //         alert(error)
    //     }
    // }


    return (
        <div className="container">
            <div className="signin_wrapper" style={{margin: '100px'}}>
                <form onSubmit={formik.handleSubmit}>
                    <h2>Please login</h2>
                    <input
                        name='email'
                        placeholder='Email'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email}
                    />

                    {formik.touched.email && formik.errors.email
                        ? <div className="error_label">{formik.errors.email}</div>
                        : null
                    }

                    <input
                        placeholder="enter your password"
                        name='password'
                        type='Password'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.password}
                    />
                    {formik.touched.password && formik.errors.password
                        ? <div className="error_label">{formik.errors.password}</div>
                        : null
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