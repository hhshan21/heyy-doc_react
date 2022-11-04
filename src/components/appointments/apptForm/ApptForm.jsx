import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Box,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  FormHelperText,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { AdapterLuxon } from "@mui/x-date-pickers/AdapterLuxon";
import { DateTime } from "luxon";
import { toast } from "react-toastify";
import axios from "axios";
import jwt_decode from "jwt-decode";
import "./ApptForm.css";
import "bootstrap";

// const BASE_API_URL = "http://localhost:8000";
const BASE_API_URL = window.BASE_API_URL;

const ApptForm = (props) => {
  const navigate = useNavigate();
  const [catchError, setCatchError] = useState(null);

  const tomorrow = DateTime.now()
    .plus({ days: 1 })
    .setLocale("zh")
    .toLocaleString();

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

  ///api/v1/doctors
  // https://heyy-doc-backend.herokuapp.com/api/v1/doctors

  // fetching doctors api here
  useEffect(() => {
    const fetchApi = async () => {
      const res = await axios.get(`${BASE_API_URL}/api/v1/doctors`, {
        headers: headerOptions,
      });
      const data = await res.data;
      // console.log("data in ApptForm: ", data);
      setDoctors(data);
    };
    fetchApi();
    toast.promise(fetchApi, {
      pending: "Please wait while we call our doctors!",
      success: "Doctors' info have arrived!",
    });
  }, []);

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

    try {
      const res = await axios.post(
        `${BASE_API_URL}/api/v1/user/bookings`,
        {
          patientId: userId,
          doctorId: selectedDoctorId,
          bookingDate: apptDate,
          bookingTime: selectedTimeSlot,
          symptoms: symptoms,
        },
        { headers: headerOptions }
      );
      // console.log("Server Respond:", res);

      toast.success("Successfully booked!", {
        position: toast.POSITION.TOP_CENTER,
      });

      navigate("/my/appointments");
    } catch (error) {
      // console.log("error: ", error);
      // display an error
      toast.error(error.response.data.err);
      setCatchError(error.response.error);
    }
  };

  const handleCancel = (e) => {
    navigate("/");
  };

  return (
    <div className="apptForm">
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
          <Box mb={3} sx={{ minWidth: 120 }}>
            <div>
              <FormControl style={{ width: "14.5em" }}>
                <InputLabel id="doctorName">Doctor's Name</InputLabel>
                <Select
                  id="doctorId"
                  required
                  label="Doctor's Name"
                  value={selectedDoctorId}
                  onChange={handleDoctorChange}
                >
                  {doctors.map((doctor) => {
                    return (
                      <MenuItem value={doctor.id} key={doctor.id}>
                        {`Dr. ${doctor.lastName} ${doctor.firstName}`}
                      </MenuItem>
                    );
                  })}
                </Select>
                <FormHelperText id="docHelperText">
                  Please select a Doctor
                </FormHelperText>
              </FormControl>
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
                  marginTop: "0.5em",
                }}
              >
                Please select from tomorrow's date onwards
              </div>
            </LocalizationProvider>
          </Box>
          <Box mb={3}>
            <div>
              <FormControl style={{ width: "14.5em" }}>
                <InputLabel id="apptSlot">Appointment Slot</InputLabel>
                <Select
                  id="apptTime"
                  required
                  label="Appointment Slot"
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
                </Select>
                <FormHelperText id="apptHelperText">
                  Please select a slot
                </FormHelperText>
              </FormControl>
            </div>
          </Box>
          <Box mb={3}>
            <div className="symptoms">
              <TextField
                sx={{ m: 1 }}
                value={symptoms}
                onChange={handleSymptomsChange}
                id="symptoms"
                label="Please key in your symptoms"
                multiline
                required
                rows={4}
                helperText="Min. 3 characters"
                style={{
                  width: "25em",
                  marginBottom: "1em",
                }}
              />
            </div>
          </Box>
          <div className="apptFormBtn">
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
              BOOK
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ApptForm;
