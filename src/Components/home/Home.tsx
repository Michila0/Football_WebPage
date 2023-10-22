import { Featured } from './featured/Featured.tsx';
import { MatchesHome } from "./matches/MatchesHome.tsx";
import {MeetPlayers} from "./meetPlayers/MeetPlayers.tsx";
import {Promotion} from "./promotion/Promotion.tsx";

export const Home = () => {
    return(
        <div className="bck_blue">
            <Featured/>
            <MatchesHome/>
            <MeetPlayers/>
            <Promotion/>
        </div>
    )
}