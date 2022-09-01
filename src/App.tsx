import React from "react";
import {  Route, Routes } from "react-router-dom";
import { Navigation } from "./components/Navigation/Navigation";
import AdminPage from "./pages/admin";
import MainPage from "./pages/main";

const App: React.FC = () => {
    return (
        <>
            <Navigation />
            <Routes>
                <Route path="/" element={<MainPage />}></Route>
                <Route path="/admin" element={<AdminPage />}></Route>
            </Routes>
        </>
    );
};

export default App;
