import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Box } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { AdapterLuxon } from "@mui/x-date-pickers/AdapterLuxon";
import { DateTime } from "luxon";
import { toast } from "react-toastify";
import axios from "axios";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import "./ApptForm.css";
import "bootstrap";

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

  const headerOptions = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("user_token")}`,
  };

  //http://localhost:8000/api/v1/doctors
  // https://heyy-doc-backend.herokuapp.com/api/v1/doctors

  useEffect(() => {
    const fetchApi = async () => {
      const res = await axios.get(
        `https://heyy-doc-backend.herokuapp.com/api/v1/doctors`,
        {
          headers: headerOptions,
        }
      );
      const data = await res.data;
      // console.log("data: ", data);
      setDoctors(data);
    };
    fetchApi();
  }, []);

  const handleDateChange = (newApptDate) => {
    setApptDate({ ...apptDate, bookingDate: newApptDate });
  };

  const handleSymptomsChange = (e) => {
    setSymptoms(e.target.value);
  };

  // form validation rules
  const validationSchema = yup.object().shape({
    symptoms: yup
      .string()
      .min(3, "Mininum 3 characters")
      .required("Please indicate your symptoms"),
  });

  // const onSubmit = async (data) => {
  //   console.log("In appt form:", data);
  //   props.data(data);
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCatchError(null);

    try {
      const res = await axios.post(
        "http://localhost:8000/api/v1/user/bookings",
        { headers: headerOptions },
        {
          data: {
            doctor: selectedDoctorId,
            bookingDate: apptDate,
            symptoms: symptoms,
          },
        }
      );
      // console.log("Server Respond:", res);

      toast.success("Successfully booked!", {
        position: toast.POSITION.TOP_CENTER,
      });

      navigate("/my/appointments");
    } catch (error) {
      // console.log("error: ", error);
      // display an error
      // console.log("error.response.data: ", error.response.data);
      toast.error(error.response.data);
      setCatchError(error.response.data.error);
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
          <Box mb={3}>
            {/* <select
              value={docFullName}
              onChange={(e) => setDocFullName(e.target.value)}
            >
              {docName.map((name) => (
                <option value={name} key={name}>
                  {name}
                </option>
              ))}
            </select> */}
          </Box>
          <Box mb={3}>
            <LocalizationProvider dateAdapter={AdapterLuxon}>
              <DesktopDatePicker
                name="bookingDate"
                label="Select your Appointment Date:"
                inputFormat="yyyy/MM/dd"
                minDate={DateTime.now()
                  .plus({ days: 1 })
                  .setLocale("zh")
                  .toLocaleString()}
                onChange={handleDateChange}
                value={apptDate.bookingDate}
                renderInput={(params) => <TextField {...params} />}
              />
              <div style={{ marginBottom: "1em", fontSize: "small" }}>
                Please select from tomorrow's date onwards
              </div>
            </LocalizationProvider>
          </Box>
          <Box mb={3}>
            {/* <Controller
              name="email" //actual input
              control={control} //take place of the register RHF
              render={({
                field, //this error will be displyed in formstate errors
              }) => (
                <TextField
                  label={"Email:"} //label in the box
                  variant="outlined"
                  fullWidth
                  autoComplete="email"
                  autoFocus
                  // error={!!error} //convert obj into a bool
                  // helperText={error ? error.message : null}
                  error={errors.email ? true : false}
                  helperText={errors.email?.message}
                  {...field}
                />
              )}
            /> */}
          </Box>
          <Box mb={3}>
            <div className="mb-3">
              <label for="symptoms" style={{ fontSize: "small" }}>
                Symptoms (min 3 characters):
              </label>
              <input
                className="symptoms"
                placeholder="Please key in your symptoms"
                required
                type="text"
                id="symptoms"
                name="symptoms"
                value={symptoms}
                onChange={handleSymptomsChange}
                style={{ row: "3" }}
              ></input>
            </div>
            {/* <Controller
              name="symptoms" //actual input
              control={control} //take place of the register RHF
              render={({ field }) => (
                <TextField
                  label={"Symptoms:"} //label in the box
                  variant="outlined"
                  rows={4}
                  required
                  //multiline={true}
                  fullWidth
                  autoFocus
                  // error={!!error} //convert obj into a bool
                  // helperText={error ? error.message : null}
                  // error={errors.drugAllergies ? true : false}
                  // helperText={errors.drugAllergies?.message}
                  {...field}
                  error={errors.symptoms ? true : false}
                  helperText={errors.symptoms?.message}
                />
              )}
            /> */}
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
