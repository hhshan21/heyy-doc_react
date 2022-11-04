import React, { useEffect, useState } from "react";
import Banner from "../../components/banner/BannerDoc";
import DoctorCard from "../../components/doctorCard/DoctorCard";
import styles from "./doctorsPage.module.scss";
import { toast } from "react-toastify";
import axios from "axios";

// const BASE_API_URL = "http://localhost:8000";
const BASE_API_URL = window.BASE_API_URL;

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);

  // https://heyy-doc-backend.herokuapp.com/api/v1/doctors
  //http://localhost:8000/api/v1/doctors

  useEffect(() => {
    const fetchApi = async () => {
      const res = await axios.get(`${BASE_API_URL}/api/v1/doctors`);
      const data = await res.data;
      // console.log("data: ", data);
      setDoctors(data);
    };
    fetchApi();
    toast.promise(fetchApi, {
      pending: "Please wait patiently for our doctors!",
      success: "Heyy Doc!",
    });
  }, []);

  const doctorCards = doctors.map((doctor) => (
    <DoctorCard key={doctor.id} data={doctor} />
  ));
  // console.log("doctors: ", doctors);

  return (
    <div>
      <Banner />
      <div className={styles["doctorsHeader"]}>MEET OUR PANEL OF DOCTORS</div>
      <div className={styles["doctors-container"]}>{doctorCards}</div>
    </div>
  );
};

export default Doctors;
