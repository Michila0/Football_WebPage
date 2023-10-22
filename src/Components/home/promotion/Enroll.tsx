import React, {useState} from "react";
import { Fade } from "react-awesome-reveal";
import { CircularProgress } from "@mui/material";

import { useFormik } from "formik";
import * as Yup from "yup";

import {showSuccessToast, showErrorToast} from "../../utils/tools.tsx";
import { promotionsCollection } from "../../../config/firebase-config.tsx";
import {addDoc, getDocs, query, where} from "firebase/firestore";

export const Enroll = () => {
    const [loading, setLoading] = useState(false);

    const formik = useFormik({
        initialValues: {email: ''},
        validationSchema: Yup.object({
            email: Yup.string()
                .email('Invalid email')
                .required('The Email is required')
        }),
        onSubmit: (values) => {
            setLoading(true);
            ////submit form
            submitForm(values.email)
        }
    });

    const submitForm = async(email:string) => {
        try {
            console.log(email)
            const isOnTheList = await query(promotionsCollection,where('email','==',email));

            const querySnapshot = await getDocs(isOnTheList)
            if (querySnapshot.docs.length >= 1){
                showErrorToast('sorry you are on the list already')
                setLoading(false);

                return false;
            }

            await addDoc(promotionsCollection,{email: email})
            formik.resetForm();
            setLoading(false);
            showSuccessToast('Congratulation!!!:)')

        }catch (error){
            console.log(error)
        }
    }

    return(
        <Fade>
            <div className="enroll_wrapper">
                <form onSubmit={formik.handleSubmit}>
                    <div className='enroll_title'>
                        Enter your email
                    </div>
                    <div className="enroll_input">
                        <input
                            name="email"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.email}
                            placeholder="Enter your email"
                        />

                        {formik.touched.email && formik.errors.email
                            ? <div className="error_label">
                                {formik.errors.email}
                            </div>
                            : null
                        }

                        { loading
                            ? <CircularProgress color="secondary" className="progress" />
                            : <button type="submit">
                                Enroll
                            </button>
                        }

                        <div className="enroll_discl">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Unde ex facere aliquam.</div>

                    </div>
                </form>
            </div>
        </Fade>
    )
}