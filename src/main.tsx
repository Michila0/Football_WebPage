//import React from 'react';
import ReactDOM from 'react-dom/client';
import './Resources/css/app.css';
import App from './App.tsx';
import {auth} from "./config/firebase-config.tsx"
import {onAuthStateChanged} from "firebase/auth"



const App1 = (props: any) => {
    return(
        <App {...props}/>
    )
}




//const root = ReactDOM.createRoot(document.getElementById('root')!)
onAuthStateChanged(auth, (user) => {

    ReactDOM.createRoot(document.getElementById('root')!).render(
            <App1 user={user}/>
    )
})