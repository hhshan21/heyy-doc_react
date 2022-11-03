import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Grid, Paper, Typography, ButtonBase, Button } from "@mui/material";
import "./PatientApptCard.css";
import { toast } from "react-toastify";
import axios from "axios";

const PatientApptCard = (props) => {
  const navigate = useNavigate();
  const params = useParams();
  console.log("hi from patient Appt Card props: ", props);
  const { id, bookingDate, bookingTime, symptoms, patient } = props.data;

  // compare dates to determine if its past booking or not
  const currentDate = new Date();
  const nextDate = new Date(currentDate.getTime() + 86400000);
  const isNextDate = nextDate.toISOString().substring(0, 10);
  // console.log("isNextDate: ", isNextDate);
  const checkDate = isNextDate > bookingDate;
  // console.log("checkDate: ", checkDate);

  const headerOptions = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("user_token")}`,
  };

  // to handle delete of appointment
  const handleDelete = async () => {
    try {
      const res = await axios.delete(
        `http://localhost:8000/api/v1/user/bookings/${props.data.id}`,
        { headers: headerOptions }
      );

      toast.success("Successfully deleted", {
        position: toast.POSITION.TOP_CENTER,
      });

      window.location.reload(false);
    } catch (error) {
      toast.error(error.message, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  // to window confirmation of delete
  const delConfirmation = (e) => {
    if (window.confirm("Are you sure you want to delete the appointment?")) {
      e.preventDefault();
      handleDelete();
    } else {
      return false;
    }
  };

  return (
    <div className="patientAppt">
      <div className="patientApptCards">
        <Paper
          sx={{
            p: 2,
            margin: "auto",
            maxWidth: 600,
            flexGrow: 1,
            backgroundColor: (theme) =>
              theme.palette.mode === "dark" ? "#1A2027" : "#fff",
          }}
          style={{ marginBottom: "2em", border: "1px solid #979797" }}
        >
          {!checkDate ? (
            <div className="container text-center">
              <h5 className="cardHeader">
                <strong>Upcoming Patient Appointments</strong>
              </h5>
            </div>
          ) : (
            <div className="container text-center">
              <h5>
                <strong>Past Patient Appointments</strong>
              </h5>
            </div>
          )}
          <Grid container spacing={2}>
            <Grid item>
              <ButtonBase sx={{ width: 128, height: 128 }}>
                <img
                  alt="complex"
                  src={patient.imageUrl}
                  style={{
                    margin: "auto",
                    display: "block",
                    maxWidth: "100%",
                    maxHeight: "100%",
                  }}
                />
              </ButtonBase>
            </Grid>
            <Grid item xs={12} sm container>
              <Grid item xs container direction="column" spacing={2}>
                <Grid item>
                  <div>
                    Patient Name: {patient.lastName} {patient.firstName}
                  </div>
                  <div>Date: {bookingDate}</div>
                  <div>Time: {bookingTime}</div>
                  <div>Symptoms: {symptoms}</div>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          {!checkDate ? (
            <div className="delBtn">
              <Button
                onClick={delConfirmation}
                variant="contained"
                style={{
                  backgroundColor: "#0cb4ea",
                  fontFamily: "Lexend Deca",
                  fontWeight: "900",
                  fontSize: "medium",
                  marginLeft: "15%",
                  marginRight: "10%",
                }}
              >
                DELETE
              </Button>
            </div>
          ) : (
            <div>
              <></>
            </div>
          )}
        </Paper>
      </div>
    </div>
  );
};

export default PatientApptCard;
