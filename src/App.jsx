import { Routes, Route } from "react-router-dom";
import React, { useEffect, useState } from "react";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Components
import Footer from "../src/components/partials/footer/Footer";
import SiteHeader from "./components/partials/siteHeader/SiteHeader";
import Auth from "./components/auth/Auth";
import jwt_decode from "jwt-decode";

// Pages
import Homepage from "./pages/homepage/Homepage";
import Doctors from "./pages/doctors/Doctors";
import BookingsPage from "./pages/bookingsPage/BookingsPage";
import EditBooking from "./pages/bookings/editBooking/EditBooking";
import CreateBooking from "./pages/bookings/createBooking/CreateBooking";
import LoginPage from "./pages/login/LoginPage";
import RegisterPage from "./pages/register/RegisterPage";
import ProfilePage from "./pages/profile/profilePage/ProfilePage";
import EditProfile from "./pages/profile/editProfile/EditProfile";
import ShowDocAppointments from "./pages/showDocAppointments/showDocAppointments";

function App() {
  const [tokenState, setTokenState] = useState();
  const [user, setUser] = useState();

  const token = localStorage.getItem("user_token");
  const tokenToSend = "Bearer " + token;

  const getToken = async () => {
    setTokenState(token);
    if (tokenState) {
      setUser(jwt_decode(tokenState).data.email);
    }
  };

  useEffect(() => {
    getToken();
  }, [tokenState]);

  return (
    <div className="App">
      <SiteHeader
        tokenState={tokenState}
        user={user}
        setTokenState={setTokenState}
      />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/my/profile" element={<Auth component={ProfilePage} />} />
        <Route
          path="/my/profile/edit"
          element={<Auth component={EditProfile} />}
        />
        <Route
          path="/my/bookings"
          element={<Auth component={BookingsPage} />}
        />
        <Route
          path="/my/bookings/create"
          element={<Auth component={CreateBooking} />}
        />
        <Route
          path="/my/bookings/:id"
          element={<Auth component={EditBooking} />}
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
