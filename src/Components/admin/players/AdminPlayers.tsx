import React, {useState, useEffect} from "react";
import { AdminLayout } from "../../../hoc/AdminLayout.tsx";
import { playersCollection } from "../../../config/firebase-config.tsx";
import {getDocs, limit, query, startAfter} from "firebase/firestore";
import {Button} from "@mui/material";

export const AdminPlayers = () => {

    const [lastVisible, setLastVisible] = useState(null);
    const [loading, setLoading] = useState(false);
    const [players, setPlayers] = useState(null);

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
                    console.log(error)
                }).finally(() => {
                    setLoading(false);
                })
        }

    }, [players]);
    console.log(players)
    console.log(lastVisible)

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
                    console.log(error)
                }).finally(() => {
                setLoading(false);
            })
        }else{
            console.log('nothing to load')
        }
    }

    return (
        <AdminLayout title="The Players" >
            <Button
                onClick={() => loadMorePlayers()}
            >
                Load more
            </Button>
        </AdminLayout>
    )
}