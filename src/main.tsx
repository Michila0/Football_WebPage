import React from 'react';
import ReactDOM from 'react-dom/client';
import './Resources/css/app.css';
import App from './App.tsx';
import {onAuthStateChanged} from "./config/firebase-config.tsx"
import {auth} from "./config/firebase-config.tsx";


const App1 = (props: any) => {
    return(
        <App {...props}/>

    )
}


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
  </React.StrictMode>,
)

//const auth = getAuth();
onAuthStateChanged(auth, (user) => {})
