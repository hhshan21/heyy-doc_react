import React, { useEffect, useState } from "react";
import Banner from "../../components/banner/BannerDoc";
import DoctorCard from "../../components/doctorCard/DoctorCard";
import styles from "./doctorsPage.module.scss";
import axios from "axios";
require("dotenv-webpack").config();

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);

  // "http://localhost:8000/api/v1/user/doctors",
  useEffect(() => {
    const fetchApi = async () => {
      const res = await axios.get(
        `https://heyy-doc-backend.herokuapp.com/api/v1/user/doctors`
      );
      const data = await res.data;
      // console.log("data: ", data);
      setDoctors(data);
    };
    fetchApi();
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
