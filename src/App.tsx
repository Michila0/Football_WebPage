//import React from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";


import {Header} from "./Components/Header_footer/header.tsx";
import {Footer} from "./Components/Header_footer/footer.tsx";
import {Home} from "./Components/home/Home.tsx";
import {SignIn} from "./Components/Signin";


function App() {


  return (
    <>
        <BrowserRouter>
            <Header/>

            <Routes>
                <Route path='/sign_in'  Component={SignIn}/>
                <Route path='/' Component={Home}/>
            </Routes>

            <Footer/>
        </BrowserRouter>
    </>
  )
}

export default App
