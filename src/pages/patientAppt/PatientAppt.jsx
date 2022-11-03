import React, { useState, useEffect } from "react";
import axios from "axios";
import PatientApptCard from "../../components/patientApptCard/PatientApptCard";
import "./PatientAppt.css";

const PatientAppt = () => {
  const [patientappts, setPatientAppts] = useState([]);

  const headerOptions = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("user_token")}`,
  };

  //https://heyy-doc-backend.herokuapp.com/api/v1/appointments
  //http://localhost:8000/api/v1/appointments

  useEffect(() => {
    const fetchApi = async () => {
      const res = await axios.get(
        "http://localhost:8000/api/v1/user/appointments",
        {
          headers: headerOptions,
        }
      );
      const data = await res.data;
      // console.log("data: ", data);
      setPatientAppts(data);
    };
    fetchApi();
  }, []);

  // console.log("patientappts[0]: ", patientappts[0]);

  const patientapptCards = patientappts.map((patientappt) => (
    <PatientApptCard key={patientappt.id} data={patientappt} />
  ));

  return (
    <div>
      <h1 className="text-center mt-3 mb-4 patientApptHeader">
        My Patient Appointments
      </h1>
      {patientapptCards}
    </div>
  );
};

export default PatientAppt;
