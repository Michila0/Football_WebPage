import {useEffect, useState} from "react";
import { useFormik } from "formik";
import * as Yup from 'yup';

import {selectError, selectErrorHelper, showErrorToast, showSuccessToast, textErrorHelper} from "../../utils/tools.tsx";
import {MatchesType, TeamsType} from "../../../temp/m-city-export.tsx";
import {AdminLayout} from "../../../hoc/AdminLayout.tsx";
import {Button, FormControl, MenuItem, Select, TextField} from "@mui/material";
import {doc, getDoc, getDocs} from "firebase/firestore";
import {matchesCollection, teamsCollection} from "../../../config/firebase-config.tsx";
import {useNavigate, useParams} from "react-router-dom";


const defaultValues: MatchesType = {
    date:'',
    local:'',
    resultLocal:'',
    away:'',
    resultAway:'',
    referee:'',
    stadium:'',
    result:'',
    final:''
}

export function AddEditMatch () {

    const [loading, setLoading] = useState<boolean>(false);
    const [formType, setFormType] = useState<string>('');
    const [teams, setTeams] = useState<TeamsType[] | null>(null);
    const [values, setValues] = useState<MatchesType>(defaultValues)

    const { matchid } = useParams();

    const formik = useFormik({
        enableReinitialize:true,
        initialValues:values,
        validationSchema: Yup.object({
            date:Yup.string().required('This input is required'),
            local:Yup.string().required('This input is required'),
            resultLocal:Yup.number().min(0,'This minium is 0 ').max(99,'This maximum is 99'),
            away:Yup.string().required('This input is required'),
            resultAway:Yup.number().min(0,'This minium is 0 ').max(99,'This maximum is 99'),
            referee:Yup.string().required('This input is required'),
            stadium:Yup.string().required('This input is required'),
            result:Yup.mixed().required('This input is required').oneOf(['W','D','L','n/a']),
            final:Yup.mixed().required('This input is required').oneOf(['yes','no']),
        }),
        onSubmit: (values:MatchesType) => {
            //submit form
            console.log(values)
        }
    })

    async function getTeams() {
        try {
            const curentTeams: TeamsType[] = [];
            const teamSnapShot = await getDocs(teamsCollection);
            teamSnapShot
                .forEach((team) => {
                    curentTeams.push({...team.data(), id: team.id} as TeamsType)
                })
            setTeams(curentTeams)
        } catch (error) {
            showErrorToast(error)
        }
    }

    async function getMatches() {
        try {
            const matchRef = doc(matchesCollection,matchid);
            const matchSnapShot = await getDoc(matchRef);
            setValues({
                ...matchSnapShot.data(),
                id: matchSnapShot.id
            } as MatchesType)
        } catch (error) {
            showErrorToast('Error loading matches')
        }
    }

    const showTeams = () => (
        teams
            ? teams.map((item) => (
                <MenuItem key={item.id} value={item.shortName} >
                    {item.name}
                </MenuItem>

            ))
            : null
    )
    // function showTeams() {
    //     const teamsMenu = teams?.map((team) => (
    //         <MenuItem key={team.id} value={team.shortName}>
    //             {team.name}
    //         </MenuItem>
    //     ));
    //
    //     return teamsMenu;
    // }

    useEffect(() => {
        if (!teams) {
            getTeams();
        }
    }, [teams]);

    useEffect(() => {
        if (matchid) {
            //edit
            setFormType('edit');
            getMatches();
        } else {
            //add
            setFormType('add');
            setValues(defaultValues);
        }
    }, [matchid]);



    return (
        <AdminLayout title={formType ==='add' ? 'Add match':'Edit match'} navigate={useNavigate()}>
           <div className='editmatch_dialog_wrapper'>
               <div>
                   <form onSubmit={formik.handleSubmit}>
                       <div>
                           <h4>Select date</h4>
                           <FormControl>
                               <TextField
                                    id='date'
                                    // name='date'
                                    type='date'
                                    {...formik.getFieldProps('date')}
                                    {...textErrorHelper(formik,'date')}
                               />
                           </FormControl>
                       </div>

                       <hr/>

                       <div>
                           <h4>Result local</h4>
                           <FormControl error={selectError(formik,'local')}>
                                <Select
                                    id='local'
                                    variant='outlined'
                                    displayEmpty
                                    {...formik.getFieldProps('local')}
                                >
                                    <MenuItem value='' disabled>Select a team</MenuItem>
                                    {showTeams()}
                                </Select>
                                {selectErrorHelper(formik,'local')}

                           </FormControl>

                           <FormControl
                                style={{marginLeft: '10px'}}
                           >
                               <TextField
                                   id='resultLocal'
                                   name='resultLocal'
                                   type='number'
                                   variant='outlined'
                                   {...formik.getFieldProps('resultLocal')}
                                   {...textErrorHelper(formik,'resultLocal')}
                               />
                           </FormControl>
                       </div>

                       <div>
                           <h4>Result away</h4>
                           <FormControl error={selectError(formik,'away')}>
                               <Select
                                   id='away'
                                   variant='outlined'
                                   displayEmpty
                                   {...formik.getFieldProps('away')}
                               >
                                   <MenuItem value='' disabled>Select a team</MenuItem>
                                   {showTeams()}
                               </Select>
                               {selectErrorHelper(formik,'away')}

                           </FormControl>

                           <FormControl
                               style={{marginLeft: '10px'}}
                           >
                               <TextField
                                   id='resultAway'
                                   name='resultAway'
                                   type='number'
                                   variant='outlined'
                                   {...formik.getFieldProps('resultAway')}
                                   {...textErrorHelper(formik,'resultAway')}
                               />
                           </FormControl>
                       </div>

                       <hr/>

                       <div>
                           <h4>Match info</h4>
                           <div className='mb-5'>
                               <FormControl>
                                   <TextField
                                       id='referee'
                                       // name='date'
                                       type='referee'
                                       placeholder='Add the referee name'
                                       {...formik.getFieldProps('referee')}
                                       {...textErrorHelper(formik,'referee')}
                                   />
                               </FormControl>
                           </div>
                           <div className='mb-5'>
                               <FormControl>
                                   <TextField
                                       id='stadium'
                                       // name='date'
                                       type='stadium'
                                       placeholder='Add the stadium name'
                                       {...formik.getFieldProps('stadium')}
                                       {...textErrorHelper(formik,'stadium')}
                                   />
                               </FormControl>
                           </div>

                           <div className='mb-5'>
                               <FormControl error={selectError(formik,'result')}>
                                   <Select
                                       id='result'
                                       variant='outlined'
                                       displayEmpty
                                       {...formik.getFieldProps('result')}
                                   >
                                       <MenuItem value='' disabled>Select a result</MenuItem>
                                       <MenuItem value='W'>Win</MenuItem>
                                       <MenuItem value='D'>Draw</MenuItem>
                                       <MenuItem value='L'>Lose</MenuItem>
                                       <MenuItem value='n/a'>Non available</MenuItem>

                                   </Select>
                                   {selectErrorHelper(formik,'result')}

                               </FormControl>
                           </div>

                           <div className='mb-5'>
                               <FormControl error={selectError(formik,'final')}>
                                   <Select
                                       id='final'
                                       variant='outlined'
                                       displayEmpty
                                       {...formik.getFieldProps('final')}
                                   >
                                       <MenuItem value='' disabled>Was the game played ?</MenuItem>
                                       <MenuItem value='yes'>Yes</MenuItem>
                                       <MenuItem value='no'>No</MenuItem>

                                   </Select>
                                   {selectErrorHelper(formik,'final')}

                               </FormControl>
                           </div>

                           <Button
                               type='submit'
                               variant='contained'
                               color='primary'
                               disabled={loading}
                           >
                               {formType === 'add'
                                   ? 'Add match'
                                   : 'Edit match'
                               }
                           </Button>

                       </div>

                   </form>
               </div>
           </div>
        </AdminLayout>
    )
}