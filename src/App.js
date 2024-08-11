import './App.css';
import Header from "./components/Header/Header";
import FooterMenu from "./components/FooterMenu/FooterMenu";
import MainComponent from "./components/MainComponent/MainComponent";
import {Route, Routes} from "react-router-dom";
import Tasks from "./components/Tasks/Tasks";
import React from "react";

function App() {
    return (
        <div className="App">
            <Header/>
            <Routes>
                <Route index element={<MainComponent />} />
                <Route path="tasks" element={<Tasks />} />
            </Routes>
            {/*<FooterMenu/>*/}
        </div>
    );
}

export default App;
