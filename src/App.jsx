import { Routes, Route } from "react-router-dom";
import React from "react";
import "./App.css";
import Footer from "../src/components/partials/footer/Footer";
import SiteHeader from "./components/partials/siteHeader/SiteHeader";
import Homepage from "./pages/homepage/Homepage";
import Doctors from "./pages/doctors/Doctors";
import MyBookings from "./pages/myBookings/MyBookings";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";

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
