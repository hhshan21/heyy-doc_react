import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Grid, Paper, Typography, ButtonBase, Button } from "@mui/material";
import { Diversity1 } from "@mui/icons-material";
import "./ApptCard.css";
import { toast } from "react-toastify";
import axios from "axios";

const BookingCard = (props) => {
  const navigate = useNavigate();
  // console.log("hi from BookingCard props: ", props);
  const { id, bookingDate, bookingTime, symptoms, doctor } = props.data;

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
    <div className="myBookings">
      <div className="bookingCards">
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
                <strong>Upcoming Appointments</strong>
              </h5>
            </div>
          ) : (
            <div className="container text-center">
              <h5 className="cardHeader">
                <strong>Past Appointments</strong>
              </h5>
            </div>
          )}
          <Grid container spacing={2}>
            <Grid item>
              <ButtonBase sx={{ width: 128, height: 128 }}>
                <img
                  alt="complex"
                  src={doctor.imageUrl}
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
                <Grid item xs>
                  <div className="doctorName">
                    Dr. {doctor.lastName} {doctor.firstName}
                  </div>
                  <div>{doctor.doctorInfo.doctorType}</div>
                  <div>{doctor.doctorInfo.address}</div>
                </Grid>
                <Grid item>
                  <div className="apptInfo">Appointment Info</div>
                  <div>Date: {bookingDate}</div>
                  <div>Time: {bookingTime}</div>
                  <div>Symptoms: {symptoms}</div>
                </Grid>
              </Grid>
              {/* <Grid item>
                <div className="apptInfo">Appointment Info</div>
                <div>Date: {bookingDate}</div>
                <div>Time: {bookingTime}</div>
                <div>Symptoms: {symptoms}</div>
              </Grid> */}
            </Grid>
          </Grid>
          {!checkDate ? (
            <div className="bookingBtn">
              <Button
                onClick={() => navigate("/my/appointments/create")}
                variant="contained"
                style={{
                  backgroundColor: "#0cb4ea",
                  fontFamily: "Lexend Deca",
                  fontWeight: "900",
                  width: "15%",
                  fontSize: "medium",
                  color: "white",
                }}
              >
                EDIT
              </Button>
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

export default BookingCard;
