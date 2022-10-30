import React, { useEffect } from "react";
import Banner from "../../components/banner/BannerDoc";
import "./Doctors.css";

const Doctors = (props) => {
  useEffect(() => {
    const fetchApi = async () => {
      const res = await fetch("http://localhost:8000/api/v1/doctors");
      const data = await res.json();
      console.log("data: ", data);
    };
    fetchApi();
  }, []);

  return (
    <div>
      <Banner></Banner>Meet our Panel of Doctors
    </div>
  );
};

export default Doctors;
