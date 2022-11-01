import React, { useState, useEffect } from "react";
import axios from "axios";
import ApptCard from "../../components/appointments/apptCard/ApptCard";
import "./AppointmentPage.css";

const AppointmentsPage = () => {
  const [appointments, setAppointments] = useState([]);

  const headerOptions = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("user_token")}`,
  };

  useEffect(() => {
    const fetchApi = async () => {
      const res = await axios.get(
        "http://localhost:8000/api/v1/user/bookings",
        {
          headers: headerOptions,
        }
      );
      const data = await res.data;
      // console.log("data: ", data);
      setAppointments(data);
    };
    fetchApi();
  }, []);

  const allAppointments = appointments.bookings;

  const appointmentCards = allAppointments.map((appointment) => (
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
