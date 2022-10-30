import React from "react";
import { useNavigate } from "react-router-dom";
import "./DoctorCard.css";

const DoctorCard = (props) => {
  console.log("DoctorCard props: ", props);
  const { id, firstName } = props.data;

  return <div>DoctorCard - {firstName} </div>;
};

export default DoctorCard;
