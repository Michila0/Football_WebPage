import {AdminLayout} from "../../../hoc/AdminLayout.tsx";
import {selectError, selectErrorHelper, showErrorToast, showSuccessToast, textErrorHelper} from "../../utils/tools.tsx";
import { playersCollection } from "../../../config/firebase-config.tsx";

import { useFormik } from "formik";
import * as Yup from 'yup';
import { TextField, Select, MenuItem, FormControl, Button} from "@mui/material";
import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";

type valuesType = {
    name: string,
    lastname: string,
    position: string,
    number: string,
    image?: string
}
const defaultValues = {
    name: '',
    lastname: '',
    number: '',
    position: '',
    image: ''
}
export const AddEditPlayers = () => {

    const [formType, setFormType] = useState('');
    const [values, setValues] = useState<valuesType>(defaultValues);
    const {playerid} = useParams();

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: values,
        validationSchema: Yup.object({
            name: Yup.string().required('This input is required'),
            lastname: Yup.string().required('This input required'),
            number: Yup.number().required('This input required')
                .min('0','The minimum is cero')
                .max('100','The maximum is 100'),
            position: Yup.string().required('This input required'),
            image: Yup.string().required('image is required')
        })
    })

    useEffect(() => {
        const param = playerid;
        if (param){
            setFormType('edit');
            setValues({name: 'sjshsjs',lastname: '',number: '',position: ''})
        }else {
            setFormType('add');
            setValues(defaultValues)
        }
    }, [playerid]);

    console.log(formType,values)

    return (
        <AdminLayout title={formType === 'add' ? 'Add player' : 'Edit player'} navigate={useNavigate()}>
            <div className='editmatch_dialog_wrapper'>
                <div>
                    <form onSubmit={formik.handleSubmit}>

                        image
                        <hr/>

                        <h4>Player info</h4>
                        <div className='mb-5'>
                            <FormControl>
                                <TextField
                                    id='name'
                                    // name='name'
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
                                    // name='lastname'
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
                                    // name='number'
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
                                    // name='position'
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
                    </form>
                </div>
            </div>
        </AdminLayout>
    )
}