import React from "react";
import docImg from "../../assets/images/doctors.png";
import "./Banner.css";

const Banner = () => {
  return (
    <div>
      <img className="img-fluid" src={docImg} alt="doctor image" />
    </div>
  );
};

export default Banner;
