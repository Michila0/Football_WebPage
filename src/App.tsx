//import React from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";


import {Header} from "./Components/header-footer/header.tsx";
import {Footer} from "./Components/header-footer/footer.tsx";
import {Home} from "./Components/home/Home.tsx";
import {SignIn} from "./Components/signin/Sign.tsx";
import {Dashboard} from "./Components/admin/Dashboard.tsx";
import {AdminPlayers} from "./Components/admin/players/AdminPlayers.tsx";
import { AddEditPlayers } from "./Components/admin/players/AddEditPlayers.tsx";
import { TheTeam } from './Components/the-team/TheTeam.tsx';
import { AdminMatches } from './Components/admin/matches/AdminMatches.tsx';
import { AddEditMatch } from './Components/admin/matches/AddEditMatch.tsx';


import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {Auth} from "./hoc/Auth.tsx";

interface RoutesProps {
    user: any;
}


const App: React.FC<RoutesProps> = ({user}) => {


  return (
    <>
        <BrowserRouter>
            <Header user={user}/>

            <Routes>
                <Route path="/admin_matches/edit_match/:match_id" Component={Auth(AddEditMatch)}/>
                <Route path="/admin_matches/add_match" Component={Auth(AddEditMatch)}/>
                <Route path='/admin_matches'  Component={Auth(AdminMatches)}/>

                <Route path="/admin_players/edit_player/:playerid" Component={Auth(AddEditPlayers)}/>
                <Route path='/admin_players/add_player'  Component={Auth(AddEditPlayers)}/>
                <Route path='/admin_players'  Component={Auth(AdminPlayers)}/>

                <Route path='/dashboard'  Component={Auth(Dashboard)}/>
                <Route path='/the_team'  Component={TheTeam}/>
                <Route path='/sign_in'  Component={
                    props => (<SignIn {...props} user={user}/>)}/>
                <Route path='/' Component={Home}/>
            </Routes>
            <ToastContainer/>
            <Footer/>
        </BrowserRouter>
    </>
  )
}

export default App
