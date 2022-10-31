import React, { useEffect, useState } from "react";
import Banner from "../../components/banner/BannerDoc";
import DoctorCard from "../../components/doctorCard/DoctorCard";
import styles from "./Doctors.module.scss";

const Doctors = (props) => {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const fetchApi = async () => {
      const res = await fetch("http://localhost:8000/api/v1/doctors");
      const data = await res.json();
      // console.log("data: ", data);
      setDoctors(data);
    };
    fetchApi();
  }, []);

  const doctorCards = doctors.map((doctor) => (
    <DoctorCard key={doctor.id} data={doctor} />
  ));

  return (
    <div>
      <Banner />
      <div className={styles["doctorsHeader"]}>MEET OUR PANEL OF DOCTORS</div>
      <div className={styles["doctors-container"]}>{doctorCards}</div>
    </div>
  );
};

export default Doctors;
