import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
// import About from "./pages/About";
import Login from "./pages/Login";
import DreamBig from "./pages/DreamBig";
import WatchDropStyle from "./pages/WatchDropStyle";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import BrandRegister from "./pages/BrandRegister";
import SubscriptionPlans from "./pages/SubscriptionPlans";
import BrandUpload from "./pages/BrandUpload";
import Insights from "./pages/Insights";
import PaymentPage from "./pages/PaymentPage";
import Profile from "./pages/Profile";
import Trends from "./pages/Trends";
import Events from "./pages/Events";
import WatchMe from "./pages/WatchMe";
import Brandsnearyou from "./pages/Brandsnearyou";
import Stylist from "./pages/Stylist";
import AIWidget from "./components/AIWidget";
import AdminDashboard from "./pages/AdminDashboard";
import BrandDashboard from "./pages/BrandDashboard";
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
        <Route path="/brand-register" element={<BrandRegister />} />
        <Route path="/subscription-plans" element={<SubscriptionPlans />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/trends" element={<Trends />} />
        <Route path="/events" element={<Events />} />
        <Route path="/watchme" element={<WatchMe />} />
        <Route path="/Brandsnearyou" element={<Brandsnearyou />} />
        <Route path="/stylist" element={<Stylist />} />
        <Route path="/stylist" element={<Stylist />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/brand-dashboard" element={<BrandDashboard />} />
        <Route path="/brand-upload" element={<BrandUpload />} />
        <Route path="/insights" element={<Insights />} />
      </Routes>
      <AIWidget />
    </Router>
  );
}

export default App;