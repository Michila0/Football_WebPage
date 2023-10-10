//import React from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";


import {Header} from "./Components/header-footer/header.tsx";
import {Footer} from "./Components/header-footer/footer.tsx";
import {Home} from "./Components/home/Home.tsx";
import {SignIn} from "./Components/signin/Sign.tsx";
import {Dashboard} from "./Components/admin/Dashboard.tsx";

import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {Auth} from "./hoc/Auth.tsx";

interface RoutesProps {
    user: any;
}


const App: React.FC<RoutesProps> = ({user}) => {

    //automtically creat the function for the func error
    // function func(Dashboard: () => import("react/jsx-runtime").JSX.Element): import("react").ComponentType<{}> | null | undefined {
    //     throw new Error("Function not implemented.");
    // }

  return (
    <>
        <BrowserRouter>
            <Header user={user}/>

            <Routes>
                <Route path='/dashboard'  Component={Auth(Dashboard)}/>
                <Route path='/sign_in'  Component={SignIn}/>
                <Route path='/' Component={Home}/>
            </Routes>
            <ToastContainer/>
            <Footer/>
        </BrowserRouter>
    </>
  )
}

export default App
