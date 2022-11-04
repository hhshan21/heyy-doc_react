import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TextField, Button, Box, MenuItem } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { AdapterLuxon } from "@mui/x-date-pickers/AdapterLuxon";
import { DateTime } from "luxon";
import { toast } from "react-toastify";
import axios from "axios";
import jwt_decode from "jwt-decode";
import "bootstrap";
import "./EditApptPage.css";

const EditApptPage = (props) => {
  const navigate = useNavigate();
  const params = useParams();
  const [catchError, setCatchError] = useState(null);

  console.log("hi from EditApptPage props.data: ", props.data);

  const tomorrow = DateTime.now()
    .plus({ days: 1 })
    .setLocale("zh")
    .toLocaleString();

  // const [booking, setBooking] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctorId, setSelectedDoctorId] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [apptDate, setApptDate] = useState(tomorrow);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");

  const headerOptions = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("user_token")}`,
  };

  const token = localStorage.getItem("user_token");
  const userInfo = jwt_decode(token);
  const userId = userInfo.data.userId;

  // https://heyy-doc-backend.herokuapp.com/api/v1/user/profile
  // "http://localhost:8000/api/v1/user/bookings",

  // useEffect(() => {
  //   const fetchApi = async () => {
  //     const res = await axios.get(
  //       `http://localhost:8000/api/v1/user/bookings`,
  //       {
  //         headers: headerOptions,
  //       }
  //     );
  //     const data = await res.data;
  //     console.log("Booking data: ", data);
  //     setBooking(data);
  //   };
  //   fetchApi();
  // }, []);

  // retrieve data from db to edit appt card
  useEffect(() => {
    const fetchApi = async () => {
      const res = await axios.get(`http://localhost:8000/api/v1/doctors`, {
        headers: headerOptions,
      });
      const data = await res.data;
      // console.log("data: ", data);
      setDoctors(data);
    };
    fetchApi();
  }, []);

  // console.log("doctors: ", doctors);

  const handleDateChange = (newApptDate) => {
    setApptDate(newApptDate);
  };

  const handleSymptomsChange = (e) => {
    setSymptoms(e.target.value);
  };

  const handleDoctorChange = (e) => {
    setSelectedDoctorId(e.target.value);
  };

  const handleTimeSlotChange = (e) => {
    setSelectedTimeSlot(e.target.value);
  };

  const selectedDoctorTimeSlots = doctors
    .find((doctor) => doctor.id === selectedDoctorId)
    ?.doctorTime.split(",");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCatchError(null);

    //https://heyy-doc-backend.herokuapp.com/api/v1/user/bookings/${editAppt.bookings.id}
    // "http://localhost:8000/api/v1/user/bookings/${editAppt.bookings.id}",
    try {
      const res = await axios.patch(
        `http://localhost:8000/api/v1/user/bookings/${doctors.id}`,
        {
          patientId: userId,
          doctorId: selectedDoctorId,
          bookingDate: apptDate.setLocale("zh").toLocaleString(),
          bookingTime: selectedTimeSlot,
          symptoms: symptoms,
        },
        { headers: headerOptions }
      );

      // console.log("res: ", res);

      toast.success("Appointment successfully updated!", {
        position: toast.POSITION.TOP_CENTER,
      });
      navigate("/my/appointments");
    } catch (err) {
      // console.log("err: ", err);
      toast.error(err.message, { position: toast.POSITION.TOP_CENTER });
    }
  };

  const handleCancel = (e) => {
    navigate("/my/appointments");
  };

  return (
    <div className="editApptForm">
      <h1 className="text-center pb-3 mb-3 createBookingHeader">
        Edit your Appointment
      </h1>
      <div>
        {catchError && (
          <div>
            <p
              style={{
                color: "red",
                textAlign: "center",
                marginBottom: "1em",
              }}
            >
              {catchError}
            </p>
          </div>
        )}
      </div>
      <form onSubmit={handleSubmit}>
        <div>
          <Box mb={3}>
            <div>
              <TextField
                id="doctorId"
                select
                label="Doctor Name"
                value={selectedDoctorId}
                onChange={handleDoctorChange}
                helperText="Please select a Doctor"
              >
                {doctors.map((doctor) => {
                  return (
                    <MenuItem value={doctor.id} key={doctor.id}>
                      {`Dr. ${doctor.lastName} ${doctor.firstName}`}
                    </MenuItem>
                  );
                })}
              </TextField>
            </div>
          </Box>
          <Box mb={3}>
            <LocalizationProvider dateAdapter={AdapterLuxon}>
              <DesktopDatePicker
                name="bookingDate"
                label="Select your Appointment Date"
                inputFormat="yyyy/MM/dd"
                minDate={DateTime.now()
                  .plus({ days: 1 })
                  .setLocale("zh")
                  .toLocaleString()}
                onChange={handleDateChange}
                value={apptDate}
                renderInput={(params) => <TextField {...params} />}
              />
              <div
                style={{
                  marginBottom: "1em",
                  fontSize: "small",
                  color: "rgba(0, 0, 0, 0.6)",
                }}
              >
                Please select from tomorrow's date onwards
              </div>
            </LocalizationProvider>
          </Box>
          <Box mb={3}>
            <div>
              <TextField
                id="bookingTime"
                select
                label="Appointment Time"
                helperText="Please select a time"
                onChange={handleTimeSlotChange}
              >
                {selectedDoctorTimeSlots &&
                  selectedDoctorTimeSlots.map((timeslot) => {
                    return (
                      <MenuItem value={timeslot} key={timeslot}>
                        {timeslot}
                      </MenuItem>
                    );
                  })}
              </TextField>
            </div>
          </Box>
          <Box mb={2}>
            <div className="symptoms">
              <TextField
                sx={{ m: 1 }}
                value={symptoms}
                onChange={handleSymptomsChange}
                id="symptoms"
                label="Please key in your symptoms"
                multiline
                rows={4}
                helperText="Min. 3 characters"
                style={{
                  width: "25em",
                  marginBottom: "1em",
                }}
              />
            </div>
          </Box>
          <div className="editApptFormBtn">
            <Button
              onClick={handleCancel}
              variant="contained"
              style={{
                backgroundColor: "#979797",
                fontFamily: "Lexend Deca",
                fontWeight: "900",
                fontSize: "medium",
                width: "30%",
                marginRight: "10%",
              }}
            >
              CANCEL
            </Button>
            <Button
              type="submit"
              variant="contained"
              style={{
                backgroundColor: "#0cb4ea",
                fontFamily: "Lexend Deca",
                fontWeight: "900",
                width: "30%",
                fontSize: "medium",
              }}
            >
              UPDATE
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditApptPage;
