//import React from 'react';
import {Switch, Route, BrowserRouter} from "react-router-dom";


import {Header} from "./Components/Header_footer/header.tsx";
import {Footer} from "./Components/Header_footer/footer.tsx";
import {Home} from "./Components/Home/index.tsx";


function App() {


  return (
    <>
        <BrowserRouter>
            <Header/>

            <Switch>
                <Route path='/'  exact component={Home}/>
            </Switch>
            <Footer/>
        </BrowserRouter>
    </>
  )
}

export default App
