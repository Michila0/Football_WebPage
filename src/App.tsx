//import React from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";


import {Header} from "./Components/header-footer/header.tsx";
import {Footer} from "./Components/header-footer/footer.tsx";
import {Home} from "./Components/home/Home.tsx";
import {SignIn} from "./Components/signin/Sign.tsx";

import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';



function App({user}) {

  return (
    <>
        <BrowserRouter>
            <Header user={user}/>

            <Routes>
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
