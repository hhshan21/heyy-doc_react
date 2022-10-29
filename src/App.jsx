import { Routes, Route } from "react-router-dom";
import React from "react";
import "./App.css";
import Footer from "../src/components/partials/footer/Footer";
import SiteHeader from "./components/partials/siteHeader/SiteHeader";
import Homepage from "./pages/homepage/Homepage";
import Doctors from "./pages/doctors/Doctors";
import ShowBookings from "./pages/bookings/showBookings/ShowBookings";
import EditBookings from "./pages/bookings/editBookings/EditBookings";
import CreateBookings from "./pages/bookings/createBookings/CreateBookings";
import LoginPage from "./pages/login/LoginPage";
import RegisterPage from "./pages/register/RegisterPage";
import ShowProfile from "./pages/profile/showProfile/ShowProfile";
import EditProfile from "./pages/profile/editProfile/EditProfile";
import Auth from "./components/auth/Auth";
import ShowDocAppointments from "./pages/showDocAppointments/showDocAppointments";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="App">
      <SiteHeader />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/my/profile" element={<Auth component={ShowProfile} />} />
        <Route
          path="/my/profile/edit"
          element={<Auth component={EditProfile} />}
        />
        <Route
          path="/my/bookings"
          element={<Auth component={ShowBookings} />}
        />
        <Route
          path="/my/bookings/create"
          element={<Auth component={CreateBookings} />}
        />
        <Route
          path="/my/bookings/:id"
          element={<Auth component={EditBookings} />}
        />
        <Route
          path="/my/appointments"
          element={<Auth component={ShowDocAppointments} />}
        />
      </Routes>
      <ToastContainer />
      <Footer />
    </div>
  );
}

export default App;
