import { Routes, Route } from "react-router-dom";
import React from "react";
import "./App.css";
import Footer from "../src/components/partials/footer/Footer";
import SiteHeader from "./components/partials/siteHeader/SiteHeader";
import Homepage from "./components/homepage/Homepage";
import Doctors from "./components/doctors/Doctors";
import MyBookings from "./components/myBookings/MyBookings";
import Login from "./components/login/Login";
import Register from "./components/register/RegisterPage";

function App() {
  return (
    <div className="App">
      <SiteHeader />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/myBookings" element={<MyBookings />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
