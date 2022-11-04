import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import EditApptForm from "../../components/appointments/editApptForm/EditApptForm";
import "bootstrap";
import "./EditApptPage.css";

const EditApptPage = () => {
  const params = useParams();
  const [editAppt, setEditAppt] = useState(null);

  const headerOptions = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("user_token")}`,
  };

  // retrieve individual appt data
  // and pass it to the EditApptForm component
  useEffect(() => {
    const fetchApi = async () => {
      const res = await axios.get(
        `http://localhost:8000/api/v1/user/bookings/${params.id}`,
        {
          headers: headerOptions,
        }
      );
      const data = await res.data;
      // console.log("Edit data: ", data.booking);
      setEditAppt(data.booking);
    };
    fetchApi();
  }, []);

  return (
    <div className="editApptForm">
      <h1 className="text-center pb-3 mb-3 createBookingHeader">
        Edit your Appointment
      </h1>
      {editAppt && <EditApptForm data={editAppt} />}
    </div>
  );
};

export default EditApptPage;
