import {AppBar, Toolbar, Button} from "@mui/material";
import {Link} from "react-router-dom";
import {auth} from "../../config/firebase-config.tsx";
import {signOut} from "firebase/auth";

import {CityLogo} from "../Utils/tools.tsx";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;
export const Header = ({user}:{}) => {

    const logotHandler = () => {
        signOut(auth)
            .then(() => {
                alert('signed out')
            }).catch(error => {
                alert('error')
        })
    }
    return(
        <AppBar
            position="fixed"
            style={{
                backgroundColor: '#98c5e9',
                boxShadow: 'none',
                padding: '10px 0',
                borderBottom: '2px solid #00285e'
            }}
        >
            <Toolbar style={{display: 'flex'}}>
                <div style={{flexGrow: 1}}>
                    <div className={"header_logo"}>
                        <CityLogo
                            link={true}
                            linkTo={'/'}
                            width="70px"
                            height="70px"
                        />
                    </div>
                </div>

                <Link to={"/the_team"}>
                    <Button color={"inherit"}>The Team</Button>
                </Link>
                <Link to={"/the_matches"}>
                    <Button color={"inherit"}>Matches</Button>
                </Link>

                {user
                    ?
                    <>
                        <Link to={"/dashboard"}>
                            <Button color={"inherit"}>Dashboard</Button>
                        </Link>

                            <Button color={"inherit"}
                                onClick={() => {logotHandler()}}
                            >Log out</Button>

                    </>
                    :
                    null
                }

            </Toolbar>

        </AppBar>
    )
}