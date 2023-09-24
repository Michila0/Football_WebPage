//import React from 'react';
import {Routes, Route, BrowserRouter} from "react-router-dom";


import {Header} from "./Components/Header_footer/header.tsx";
import {Footer} from "./Components/Header_footer/footer.tsx";
import {Home} from "./Components/Home/index.tsx";


function App() {


  return (
    <>
        <BrowserRouter>
            <Header/>

            <Routes>
                <Route path='/' Component={Home}/>
            </Routes>
            <Footer/>
        </BrowserRouter>
    </>
  )
}

export default App
