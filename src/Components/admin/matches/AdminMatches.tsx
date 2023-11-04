import {useState, useEffect} from "react";
import { AdminLayout } from "../../../hoc/AdminLayout.tsx";
import { matchesCollection } from "../../../config/firebase-config.tsx";
import {getDocs, limit, query, startAfter} from "firebase/firestore";
import {Button, Table, TableBody, TableCell, TableRow, Paper, CircularProgress, TableHead} from "@mui/material";
import { showErrorToast } from "../../utils/tools.tsx";
import {Link, useNavigate} from "react-router-dom";

export const AdminMatches = () => {

    const [lastVisible, setLastVisible] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [matches, setMatches] = useState<any>();

    useEffect(() => {
        if(!matches){
            setLoading(true);
            const q = query(matchesCollection,limit(2));
            console.log(q)

            getDocs(q).then(snapshot => {
                const lastVisible = snapshot.docs[snapshot.docs.length -1];
                const matches = snapshot.docs.map( doc => ({
                    id: doc.id,
                    ...doc.data()
                }))
                setLastVisible(lastVisible);
                setMatches(matches);
            }).catch(error => {
                showErrorToast(error)
            }).finally(() => {
                setLoading(false);
            })
        }

    }, [matches]);
    // console.log(players)
    // console.log(lastVisible)

    const loadMoreMatches = () => {
        if (lastVisible){
            setLoading(true)
            const q = query(matchesCollection, startAfter(lastVisible), limit(2))

            getDocs(q)
                .then(snapshot => {
                    const lastVisible = snapshot.docs[snapshot.docs.length -1];
                    const newMatches = snapshot.docs.map( doc => ({
                        id: doc.id,
                        ...doc.data()
                    }));
                    setLastVisible(lastVisible)
                    setMatches([...matches, ...newMatches])
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
        <AdminLayout title="The Matches" navigate={useNavigate()}>
            <div className="mb-5">
                <Button
                    disableElevation
                    variant="outlined"
                    component={Link}
                    to={'/admin_matches/add_match'}
                >
                    Add match
                </Button>
            </div>



            <Paper className="mb-5">
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Date</TableCell>
                            <TableCell>Match</TableCell>
                            <TableCell>Result</TableCell>
                            <TableCell>Final</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {matches
                            ? matches.map((match: any, i:number) => (
                                <TableRow key={match.id}>
                                    <TableCell>
                                        {match.date}
                                    </TableCell>
                                    <TableCell>
                                        <Link to={`/admin_matches/edit_match/${match.id}`}>
                                            {match.awayThmb} <strong> - </strong> {match.localThmb}
                                        </Link>
                                    </TableCell>
                                    <TableCell>
                                        {match.resultAway}<strong> - </strong>{match.resultLocal}
                                    </TableCell>
                                    <TableCell>
                                        {match.final === 'yes'
                                            ? <span className='matches_tag_red'>Final</span>
                                            : <span className='matches_tag_green'>Not played yet</span>
                                        }
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
                onClick={() => loadMoreMatches()}
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