import { Featured } from './featured/Featured.tsx';
import { MatchesHome } from "./matches/MatchesHome.tsx";

export const Home = () => {
    return(
        <div className="bck_blue">
            <Featured/>
            <MatchesHome/>
        </div>
    )
}