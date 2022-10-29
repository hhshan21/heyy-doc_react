import { Routes, Route } from "react-router-dom";
import React from "react";
import "./App.css";
import Footer from "../src/components/partials/footer/Footer";
import SiteHeader from "./components/partials/siteHeader/SiteHeader";
import Homepage from "./components/homepage/Homepage";
import Doctors from "./components/doctors/Doctors";
import MyBookings from "./components/myBookings/MyBookings";
import LoginPage from "./components/login/LoginPage";
import RegisterPage from "./components/register/RegisterPage";
import ShowProfile from "./components/showProfile/ShowProfile";
import EditProfile from "./components/editProfile/EditProfile";
import Auth from "./components/auth/Auth";

function App() {
  return (
    <div className="App">
      <SiteHeader />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/users/my/profile"
          element={<Auth component={ShowProfile} />}
        />
        <Route
          path="/users/my/profile/edit"
          element={<Auth component={EditProfile} />}
        />
        <Route path="/myBookings" element={<MyBookings />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
