import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
import { toast } from "react-toastify";
import { DateTime } from "luxon";
import jwt_decode from "jwt-decode";
import axios from "axios";
import "./EditApptForm.css";

// const BASE_API_URL = "http://localhost:8000";
const BASE_API_URL = window.BASE_API_URL;

const EditApptForm = (props) => {
  const navigate = useNavigate();
  const params = useParams();
  const [catchError, setCatchError] = useState(null);

  // setting a constant to the bookingDate to convert the date format
  const isoStrApptDate = props.data.bookingDate;

  const docFirstName = props.data.doctor.firstName;
  const docLastName = props.data.doctor.lastName;
  const selectedDocName = `Dr. ${docLastName} ${docFirstName}`;

  // const [booking, setBooking] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctorId, setSelectedDoctorId] = useState(
    `Dr. ${docLastName} ${docFirstName}`
  );
  const [symptoms, setSymptoms] = useState(props.data.symptoms);
  const [apptDate, setApptDate] = useState(new Date(isoStrApptDate));
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(
    props.data.bookingTime
  );

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

  const headerOptions = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("user_token")}`,
  };

  const token = localStorage.getItem("user_token");
  const userInfo = jwt_decode(token);
  const userId = userInfo.data.userId;

  // retrieve data from db to edit appt card
  useEffect(() => {
    const fetchApi = async () => {
      const res = await axios.get(`${BASE_API_URL}/api/v1/doctors`, {
        headers: headerOptions,
      });
      const data = await res.data;
      // console.log("data: ", data);
      setDoctors(data);
    };
    fetchApi();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCatchError(null);

    // https://heyy-doc-backend.herokuapp.com/api/v1/user/bookings/${editAppt.bookings.id}
    // "http://localhost:8000/api/v1/user/bookings/${editAppt.bookings.id}",
    try {
      const res = await axios.patch(
        `${BASE_API_URL}/api/v1/user/bookings/${params.id}`,
        {
          patientId: userId,
          doctorId: selectedDoctorId,
          bookingDate: apptDate,
          bookingTime: selectedTimeSlot,
          symptoms: symptoms,
        },
        { headers: headerOptions }
      );

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
    <div>
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
              <FormControl style={{ width: "14.5em" }}>
                <InputLabel id="doctorName">Doctor's Name</InputLabel>
                <Select
                  id="doctorId"
                  label="Doctor Name"
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
                <FormHelperText id="docEditHelperText">
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
                  id="bookingTime"
                  value={selectedTimeSlot}
                  label="Appointment Time"
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
                <FormHelperText id="apptEditHelperText">
                  Please select a slot
                </FormHelperText>
              </FormControl>
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

export default EditApptForm;
