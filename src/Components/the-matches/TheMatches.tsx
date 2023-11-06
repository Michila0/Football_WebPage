import {useEffect, useState} from "react";
import {DocumentData, getDocs} from "firebase/firestore";
import {CircularProgress} from "@mui/material";


import {matchesCollection} from "../../config/firebase-config.tsx";
import {showErrorToast} from "../utils/tools.tsx";
import {LeagueTable} from "./Table.tsx";


export const TheMatches = () => {

    const [matches, setMatches] = useState<DocumentData[] | null>(null);

    useEffect(() => {

        if (!matches) {
            getDocs(matchesCollection).then(snapshot => {
                const matches = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setMatches(matches);
                // dispatch({...state,filterMatches:matches})
            }).catch(error => {
                showErrorToast(error)
            })

        }
    }, [matches]);

    return (
        <>
            {matches
                ? <div className='the_matches_container'>
                    <div className='the_matches_wrapper'>
                        <div className='left'>
                            list
                        </div>
                        <div className='right'>
                            <LeagueTable/>
                        </div>
                    </div>
                </div>
                : <div className='progress'>
                    <CircularProgress/>
                </div>
            }
        </>
    )
}