import {useEffect, useState} from "react";
import {matchesCollection} from "../../../config/firebase-config.tsx";
import { getDocs,QueryDocumentSnapshot } from "firebase/firestore";
//import firebase from "firebase/compat";
//import QueryDocumentSnapshot = firebase.firestore.QueryDocumentSnapshot;
import { Slide } from 'react-awesome-reveal';
import {Matches_Block} from "../../utils/Matches_Block.tsx";

interface MatchData {
    id: string;
    date: string;
    localThmb: string;
    local: string;
    resultLocal: string;
    awayThmb: string;
    away: string;
    resultAway: string;
    final: boolean;
}
export const Blocks = () => {
    const [matches, setMatches] = useState<MatchData[]>([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const snapshot = await getDocs(matchesCollection)
                const matchesData:MatchData[] = snapshot.docs.map((doc: QueryDocumentSnapshot) => ({
                    id: doc.id,
                    date: doc.data().date,
                    localThmb: doc.data().localThmb,
                    local: doc.data().local,
                    resultLocal: doc.data().resultLocal,
                    awayThmb: doc.data().awayThmb,
                    away: doc.data().away,
                    resultAway: doc.data().resultAway,
                    final: doc.data().final,
                }));
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

    const showMatches = (matches: MatchData[]) => (
        matches
        ? matches.map((match) => (
                <Slide key={match.id} className='item' triggerOnce>
                    <div>
                        <div className='wrapper'>
                            <Matches_Block match={match} />
                        </div>
                    </div>
                </Slide>
            ))
        : null
    )

    return(
        <div className='home_matches'>
            {showMatches(matches)}
        </div>
    )
}