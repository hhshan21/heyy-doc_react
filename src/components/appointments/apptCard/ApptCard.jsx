import React from "react";
import { useNavigate } from "react-router-dom";
import { Grid, Paper, ButtonBase, Button } from "@mui/material";
import "./ApptCard.css";
import { toast } from "react-toastify";
import axios from "axios";

// const BASE_API_URL = "http://localhost:8000";
const BASE_API_URL = window.BASE_API_URL;

const ApptCard = (props) => {
  const navigate = useNavigate();
  const { id, bookingDate, bookingTime, symptoms, doctor } = props.data;

  // compare dates to determine if its past booking or not
  const currentDate = new Date();
  const nextDate = new Date(currentDate.getTime() + 86400000);
  const isNextDate = nextDate.toISOString().substring(0, 10);
  const checkDate = isNextDate > bookingDate;

  const headerOptions = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("user_token")}`,
  };

  // to handle delete of appointment
  const handleDelete = async () => {
    try {
      const res = await axios.delete(
        `${BASE_API_URL}/api/v1/user/bookings/${props.data.id}`,
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

  const handleEdit = (e) => {
    navigate(`/my/appointments/edit/${props.data.id}`);
  };

  return (
    <div className="myAppts">
      <div className="apptCards">
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
                <strong>Upcoming Heyy Doc Appointments</strong>
              </h5>
            </div>
          ) : (
            <div className="container text-center">
              <h5>
                <strong>Past Heyy Doc Appointments</strong>
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
            </Grid>
          </Grid>
          {!checkDate ? (
            <div className="apptBtn">
              <Button
                onClick={handleEdit}
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

export default ApptCard;
