import React, { useState, useEffect } from "react";
import axios from "axios";
import ApptCard from "../../components/appointments/apptCard/ApptCard";
import "./MyApptPage.css";

// const BASE_API_URL = "http://localhost:8000";
const BASE_API_URL = window.BASE_API_URL;

const AppointmentsPage = () => {
  const [appointments, setAppointments] = useState([]);

  const headerOptions = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("user_token")}`,
  };

  //https://heyy-doc-backend.herokuapp.com/api/v1/bookings
  //http://localhost:8000/api/v1/bookings

  useEffect(() => {
    const fetchApi = async () => {
      const res = await axios.get(`${BASE_API_URL}/api/v1/user/bookings`, {
        headers: headerOptions,
      });
      const data = await res.data;
      // console.log("data in MyApptPage: ", data);
      setAppointments(data.bookings);
    };
    fetchApi();
  }, []);

  const appointmentCards = appointments.map((appointment) => (
    <ApptCard key={appointment.id} data={appointment} />
  ));

  return (
    <div>
      <h1 className="text-center mt-3 mb-4 showBookingHeader">
        My Appointments
      </h1>
      {appointmentCards}
    </div>
  );
};

export default AppointmentsPage;
