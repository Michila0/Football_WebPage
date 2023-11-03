import {AdminLayout} from "../../../hoc/AdminLayout.tsx";
import {selectError, selectErrorHelper, showErrorToast, showSuccessToast, textErrorHelper} from "../../utils/tools.tsx";
import { playersCollection } from "../../../config/firebase-config.tsx";


import { useFormik } from "formik";
import * as Yup from 'yup';
import { TextField, Select, MenuItem, FormControl, Button} from "@mui/material";
import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {DocumentData, addDoc, doc, getDoc, updateDoc} from 'firebase/firestore'
import { FileUploader } from "../../utils/FileUploader.tsx";


type valuesType = {
    name: string,
    lastname: string,
    position: string,
    number: string,
    image?: string
}
const defaultValues: valuesType = {
    name: '',
    lastname: '',
    number: '',
    position: '',
    image: ''
}
export const AddEditPlayers = () => {

    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(false)
    const [formType, setFormType] = useState('');
    const [values, setValues] = useState<valuesType | DocumentData>(defaultValues);
    const [imgUrl, setImgUrl] = useState('')
    // const [defaultImgUrl, setDefaultImgUrl] = useState<string>('')
    const {playerid} = useParams();

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: values,
        validationSchema: Yup.object({
            name: Yup.string().required('This input is required'),
            lastname: Yup.string().required('This input required'),
            number: Yup.number().required('This input required')
                .min(0,'The minimum is zero')
                .max(100,'The maximum is 100'),
            position: Yup.string().required('This input required'),
            image: Yup.string().required('image is required'),
        }),
        onSubmit: (values) => {
            console.log(values)
            submitForm(values)
        },
    });


    const submitForm = async (values: valuesType | DocumentData) => {
        try {
            setLoading(true)
            if (formType === 'add') {

                await addDoc(playersCollection, values);
                formik.resetForm();
                showSuccessToast("Player was added successfully");
                navigate("/admin_players");

            } else {
                //edit
                const playerRef = doc(playersCollection, playerid);
                await updateDoc(playerRef, values);
                showSuccessToast("Player was edited successfully");
                navigate("/admin_players");
            }
        } catch (error){
            console.log(error)
        } finally {
            setLoading(false);
        }
    }


    useEffect(() => {
        const param = playerid;
        if (param){

            const docRef = doc(playersCollection, param)
            getDoc(docRef)
                .then((snapshot) => {
                    if (snapshot.data()){
                        setFormType('edit');
                        setValues(snapshot.data()!)
                    }else {
                        showErrorToast('sorry nothing was found')
                    }
                })
                .catch((error) => {
                    showErrorToast(error)

                })


        }else {
            setFormType('add');
            setValues(defaultValues)
        }
    }, [playerid]);

    // console.log(values)
    const updateImageName = (fileUrl: string) => {
        setImgUrl(fileUrl)
    }

    useEffect(() => {
        formik.setFieldValue('image',imgUrl)
    }, [imgUrl]);

    return (
        <AdminLayout title={formType === 'add' ? 'Add player' : 'Edit player'} navigate={navigate}>
            <div className='editmatch_dialog_wrapper'>
                <div>
                    <form onSubmit={formik.handleSubmit}>

                        <FormControl error={selectError(formik,'image')}>
                            <FileUploader
                                fileUrl={(fileUrl: string) => updateImageName(fileUrl)}
                                // defaultImgUrl={defaultImgUrl}
                            />
                            {selectErrorHelper(formik, 'image')}
                        </FormControl>

                        <hr/>

                        <h4>Player info</h4>
                        <div className='mb-5'>
                            <FormControl>
                                <TextField
                                    id='name'
                                    variant='outlined'
                                    placeholder='Add firstname'
                                    {...formik.getFieldProps('name')}
                                    {...textErrorHelper(formik,'name')}
                                />
                            </FormControl>
                        </div>

                        <div className='mb-5'>
                            <FormControl>
                                <TextField
                                    id='lastname'
                                    variant='outlined'
                                    placeholder='Add lastname'
                                    {...formik.getFieldProps('lastname')}
                                    {...textErrorHelper(formik,'lastname')}
                                />
                            </FormControl>
                        </div>

                        <div className='mb-5'>
                            <FormControl>
                                <TextField
                                    id='number'
                                    type='number'
                                    variant='outlined'
                                    placeholder='Add number'
                                    {...formik.getFieldProps('number')}
                                    {...textErrorHelper(formik,'number')}
                                />
                            </FormControl>
                        </div>

                        <div className='mb-5'>
                            <FormControl error={selectError(formik,'position')}>
                                <Select
                                    id='position'
                                    variant='outlined'
                                    displayEmpty
                                    {...formik.getFieldProps('position')}
                                >
                                    <MenuItem value="" disabled>Select a position</MenuItem>
                                    <MenuItem value='Keeper'>Keeper</MenuItem>
                                    <MenuItem value='Defence'>Defence</MenuItem>
                                    <MenuItem value='Midfield'>Midfield</MenuItem>
                                    <MenuItem value='Striker'>Striker</MenuItem>
                                </Select>

                                {selectErrorHelper(formik,'position')}

                            </FormControl>
                        </div>

                        <Button
                            type= 'submit'
                            variant= 'contained'
                            color= 'primary'
                            disabled= {loading}
                        >
                            {formType == "add" ? 'Add player' : 'Edit player'}
                        </Button>


                    </form>
                </div>
            </div>
        </AdminLayout>
    )
}