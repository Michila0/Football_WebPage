import React, {useEffect, useState} from "react";
import {ref} from "yup";
import { Slide } from "react-awesome-reveal";
import {getDocs} from "firebase/firestore";


import { PlayerCard } from "../utils/PlayerCard.tsx";
import {playersCollection, storage} from "../../config/firebase-config.tsx";
import {showErrorToast} from "../utils/tools.tsx";
import {PlayerType} from "../../temp/m-city-export.tsx";
import { getDownloadURL } from "firebase/storage";
import {CircularProgress} from "@mui/material";




export function TheTeam () {
    const [loading, setLoading] = useState<boolean>(false);
    const [players, setPlayers] = useState<PlayerType[]>([]);


    async function getPlayers() {
        setLoading(true)
        try {
            const currentPlayers: PlayerType[] = [];
            const playerSnapShot = await getDocs(playersCollection);
            playerSnapShot.forEach((doc) =>
                currentPlayers.push({
                    ...doc.data(),
                    id: doc.id,
                    imageURL: ""
                } as PlayerType)
            )


            const promises: Promise<string>[] = [];

            currentPlayers.forEach((player, index) => {

                const playerImgRef = ref(storage,`players/${player.image}`)

                promises.push(
                    new Promise((resolve, reject) => {
                        getDownloadURL(playerImgRef)
                            .then((url) => {
                                currentPlayers[index].imageURL = url;
                                resolve("Hi");
                            })
                            .catch((error) => {
                                reject();
                                console.log(error)
                            })
                    })
                )
            })
            Promise.all(promises).then(() => setPlayers(currentPlayers))

        } catch (error) {
            console.log("Sorry try again later")
            showErrorToast("Sorry try again later")
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        setLoading(true)
        if (players.length < 1) {
            getPlayers()
        }
    }, [players]);


    return (
        <div className='the_team_container'>
            { loading
                ? <div className='progress'>
                    <CircularProgress/>
                </div>
                : <div></div>
            }
        </div>
    )
}