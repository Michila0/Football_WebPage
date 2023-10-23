import React, {useState, useEffect} from "react";
import { AdminLayout } from "../../../hoc/AdminLayout.tsx";
import { playersCollection } from "../../../config/firebase-config.tsx";
import {getDocs, limit, query, startAfter} from "firebase/firestore";
import {Button, Table, TableBody, TableCell, TableRow, Paper, CircularProgress, TableHead} from "@mui/material";
import { showErrorToast } from "../../utils/tools.tsx";
import {Link, useNavigate} from "react-router-dom";

export const AdminPlayers = () => {

    const [lastVisible, setLastVisible] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [players, setPlayers] = useState<any>();

    useEffect(() => {
        if(!players){
            setLoading(true);
            const q = query(playersCollection,limit(2));
            console.log(q)

            getDocs(q).then(snapshot => {
                    const lastVisible = snapshot.docs[snapshot.docs.length -1];
                    const players = snapshot.docs.map( doc => ({
                        id: doc.id,
                        ...doc.data()
                    }))
                    setLastVisible(lastVisible);
                    setPlayers(players);
                }).catch(error => {
                    showErrorToast(error)
                }).finally(() => {
                    setLoading(false);
                })
        }

    }, [players]);
    // console.log(players)
    // console.log(lastVisible)

    const loadMorePlayers = () => {
        if (lastVisible){
            setLoading(true)
            const q = query(playersCollection, startAfter(lastVisible), limit(2))

            getDocs(q)
                .then(snapshot => {
                    const lastVisible = snapshot.docs[snapshot.docs.length -1];
                    const newPlayers = snapshot.docs.map( doc => ({
                        id: doc.id,
                        ...doc.data()
                    }));
                    setLastVisible(lastVisible)
                    setPlayers([...players, ...newPlayers])
                })
                .catch(error => {
                    showErrorToast(error)
                }).finally(() => {
                setLoading(false);
            })
        }else{
            showErrorToast('nothing to load')
        }
    }

    // console.log(players)

    return (
        <AdminLayout title="The Players" navigate={useNavigate()}>
            <div className="mb-5">
                <Button
                    disableElevation
                    variant="outlined"
                    component={Link}
                    to={'/admin_players/add_player'}
                >
                    Add player
                </Button>
            </div>



            <Paper className="mb-5">
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>First name</TableCell>
                            <TableCell>Last name</TableCell>
                            <TableCell>Number</TableCell>
                            <TableCell>Position</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {players
                        ? players.map((player: any, i:number) => (
                            <TableRow key={player.id}>
                                <TableCell>
                                    <Link to={`./admin_players/edit_player/${player.id}`}>{player.name}</Link>
                                </TableCell>
                                <TableCell>
                                    <Link to={`./admin_players/edit_player/${player.id}`}>{player.lastname}</Link>
                                </TableCell>
                                <TableCell>
                                    {player.number}
                                </TableCell>
                                <TableCell>
                                    {player.position}
                                </TableCell>
                            </TableRow>
                            ))
                        : null
                        }
                    </TableBody>
                </Table>
            </Paper>



            <Button
                variant="contained"
                color="primary"
                onClick={() => loadMorePlayers()}
                disabled={loading}
            >
                Load more
            </Button>

            <div className="admin_progress">
                {loading
                ? <CircularProgress thickness={7} style={{color: '#98c5e9'}}/>
                : null
                }
            </div>
        </AdminLayout>
    )
}