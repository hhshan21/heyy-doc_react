import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import doc from "../../assets/images/male doctor.png";
import { Card, Button } from "react-bootstrap";
import styles from "./doctorCard.module.scss";
import "bootstrap/dist/css/bootstrap.min.css";

const DoctorCard = (props) => {
  // console.log("DoctorCard props: ", props);
  const { id, firstName, lastName, doctorInfo } = props.data;

  console.log("doctorInfo: ", doctorInfo);

  return (
    <Card
      className={styles["card-container"]}
      style={{ width: "25rem", marginTop: "1em", marginBottom: "2em" }}
    >
      <Card.Img variant="top" src={doc} className={styles["img"]} />
      <Card.Body>
        <Card.Title>
          Dr. {lastName} {firstName}
        </Card.Title>
        <Card.Subtitle style={{ marginBottom: "0.5em" }}>
          {doctorInfo.doctorType}
        </Card.Subtitle>
        <Card.Subtitle style={{ marginBottom: "1em" }}>
          {doctorInfo.qualification}
        </Card.Subtitle>
        <Card.Subtitle style={{ marginBottom: "1em" }}>
          {doctorInfo.language}
        </Card.Subtitle>
        <Card.Subtitle style={{ marginBottom: "1em" }}>
          {doctorInfo.address}
        </Card.Subtitle>
        <Card.Text>{doctorInfo.professionalProfile}</Card.Text>
        <Button
          variant="contained"
          style={{
            backgroundColor: "#0cb4ea",
            fontFamily: "Lexend Deca",
            fontWeight: "900",
            width: "50%",
            marginLeft: "25%",
            fontSize: "110%",
            color: "white",
          }}
        >
          BOOK
        </Button>
      </Card.Body>
    </Card>
  );
};

export default DoctorCard;
