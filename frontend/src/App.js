import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
// import About from "./pages/About";
import Login from "./pages/Login";
import DreamBig from "./pages/DreamBig";
import WatchDropStyle from "./pages/WatchDropStyle";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Trends from "./pages/Trends";
import Events from "./pages/Events"; 
import WatchMe from "./pages/WatchMe"; 
import Brandsnearyou from "./pages/Brandsnearyou";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/about" element={<About />} /> */}
        <Route path="/login" element={<Login />} />
        <Route path="/dream-big" element={<DreamBig />} />
        <Route path="/watchdropstyle" element={<WatchDropStyle />} />
        <Route path="/loginpage" element={<LoginPage />} />
        <Route path="/registerpage" element={<RegisterPage />} />
        <Route path="/trends" element={<Trends />} />
        <Route path="/events" element={<Events />} />
        <Route path="/watchme" element={<WatchMe />} />
        <Route path="/Brandsnearyou" element={<Brandsnearyou />} />
      </Routes>
    </Router>
  );
}

export default App;