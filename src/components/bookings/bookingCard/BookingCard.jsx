import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./BookingCard.css";
import { Grid, Paper, Typography, ButtonBase, Button } from "@mui/material";
import { Diversity1 } from "@mui/icons-material";

const BookingCard = (props) => {
  const navigate = useNavigate();
  // console.log("hi from BookingCard props: ", props);
  const { id, bookingDate, bookingTime, symptoms, doctor } = props.data;

  const handleCancel = (e) => {
    navigate("/");
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
          <div className="bookingBtn">
            <Button
              onClick={handleCancel}
              variant="contained"
              style={{
                backgroundColor: "#979797",
                fontFamily: "Lexend Deca",
                fontWeight: "900",
                fontSize: "medium",
                marginRight: "10%",
              }}
            >
              CANCEL
            </Button>
            <Button
              onClick={() => navigate("/my/bookings/create")}
              variant="contained"
              style={{
                backgroundColor: "#0cb4ea",
                fontFamily: "Lexend Deca",
                fontWeight: "900",
                width: "15%",
                marginLeft: "15%",
                fontSize: "medium",
                color: "white",
              }}
            >
              EDIT
            </Button>
          </div>
        </Paper>
      </div>
    </div>
  );
};

export default BookingCard;
