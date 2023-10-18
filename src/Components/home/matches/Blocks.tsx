import {useEffect, useState} from "react";
import {matchesCollection} from "../../../config/firebase-config.tsx";
import { getDocs,QueryDocumentSnapshot } from "firebase/firestore";
//import firebase from "firebase/compat";
//import QueryDocumentSnapshot = firebase.firestore.QueryDocumentSnapshot;
import { Slide } from 'react-awesome-reveal';

interface MatchData {}
export const Blocks = () => {
    const [matches, setMatches] = useState<MatchData[]>([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const snapshot = await getDocs(matchesCollection)
                const matchesData:MatchData[] = snapshot.docs.map((doc: QueryDocumentSnapshot) => ({}))
                setMatches(matchesData)
                console.log(matchesData)

            } catch (error) {
                console.error(error)
            }
        };

        if (matches.length == 0) {
            fetchData();
        }
    },[matches]);

    return(
        <div>
            hello
        </div>
    )
}