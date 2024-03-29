import  {ReactNode, useEffect, useState} from "react";
import { Slide } from "react-awesome-reveal";
import {getDocs} from "firebase/firestore";


import { PlayerCard } from "../utils/PlayerCard.tsx";
import {playersCollection, storage} from "../../config/firebase-config.tsx";
import {showErrorToast} from "../utils/tools.tsx";
import {PlayerType} from "../../temp/m-city-export.tsx";
import { getDownloadURL, ref } from "firebase/storage";
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
                console.log(playerImgRef)

                promises.push(
                    new Promise((resolve, reject) => {
                        getDownloadURL(playerImgRef)
                            .then((url) => {
                                currentPlayers[index].imageURL = url;
                                resolve("Hi");
                                console.log(url)
                            })
                            .catch((error) => {
                                reject();
                                console.log(error)
                            })
                    })
                )
            })
            Promise.all(promises).then(() => setPlayers(currentPlayers))

        } catch (err) {
            console.log("Sorry try again later")
            showErrorToast("Sorry try again later")
        } finally {
            setLoading(false)
        }
    }

    function showPlayerByCategory (category: string): ReactNode {
        return players
            ? players.map((player) => {
                return player.position === category
                    ? (<Slide direction='left' key={player.id} triggerOnce={true}>
                        <div className='item'>
                            <PlayerCard
                                number = {player.number}
                                name= {player.name}
                                lastname= {player.lastname}
                                bck= {player.imageURL || ""}
                            />
                        </div>
                    </Slide>)
                    : null
            })
            : null
    }

    useEffect(() => {
        setLoading(true)
        if (players.length < 1) {
            getPlayers()
        }
        setLoading(false)
    }, [players]);


    return (
        <div className='the_team_container'>
            { loading
                ? <div className='progress'>
                    <CircularProgress/>
                </div>
                : <div>
                    <div className='team_category_wrapper'>
                        <div className='title'>Keepers</div>
                        <div className='team_cards'>
                            {showPlayerByCategory('Keeper')}

                        </div>
                    </div>

                    <div className='team_category_wrapper'>
                        <div className='title'>Defence</div>
                        <div className='team_cards'>
                            {showPlayerByCategory('Defence')}

                        </div>
                    </div>

                    <div className='team_category_wrapper'>
                        <div className='title'>Midfield</div>
                        <div className='team_cards'>
                            {showPlayerByCategory('Midfield')}

                        </div>
                    </div>

                    <div className='team_category_wrapper'>
                        <div className='title'>Strikers</div>
                        <div className='team_cards'>
                            {showPlayerByCategory('Strikers')}

                        </div>
                    </div>
                </div>
            }
        </div>
    )
}