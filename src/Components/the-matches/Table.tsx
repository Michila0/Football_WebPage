import {useEffect, useState} from "react";
import {positionsCollection} from "../../config/firebase-config.tsx";
import {DocumentData, getDocs} from "firebase/firestore";
import {showErrorToast} from "../utils/tools.tsx";
import {Table, TableBody, TableCell, TableHead, TableRow} from "@mui/material";

export const LeagueTable = () => {

    const [positions, setPosition] = useState<DocumentData[] | null>(null);

    useEffect(() => {
        if (!positions) {
            getDocs(positionsCollection)
                .then(snapshot => {
                    const positions = snapshot.docs.map(doc => ({
                        id: doc.id,
                        ...doc.data()
                    }))
                    setPosition(positions)
                })
                .catch(error => {
                    showErrorToast(error)
                })
        }
    }, [positions]);

    const showTeamPosition = () => (
        positions
            ? positions.map((pos, i) => (
                <TableRow key={i}>
                    <TableCell>{i+1}</TableCell>
                    <TableCell>{pos.team}</TableCell>
                    <TableCell>{pos.w}</TableCell>
                    <TableCell>{pos.d}</TableCell>
                    <TableCell>{pos.l}</TableCell>
                    <TableCell>{pos.pts}</TableCell>

                </TableRow>
            ))
            : null
    )

    return (
        <div className='league_table_wrapper'>
            <div className='title'>
                League Table
            </div>
            <div>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Pos</TableCell>
                            <TableCell>Team</TableCell>
                            <TableCell>W</TableCell>
                            <TableCell>L</TableCell>
                            <TableCell>D</TableCell>
                            <TableCell>Pts</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {showTeamPosition()}
                    </TableBody>

                </Table>
            </div>
        </div>
    )
}