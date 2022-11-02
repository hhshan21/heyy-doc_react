import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { TextField, Button, Box } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { AdapterLuxon } from "@mui/x-date-pickers/AdapterLuxon";
import { DateTime } from "luxon";
import "./ApptForm.css";
import "bootstrap";

const ApptForm = (props) => {
  const navigate = useNavigate();

  const doctors = props.info;
  console.log("doctors: ", doctors);
  // const docInfo = doctors.map((doctor) => )

  // to get doctor's name
  const docFirstName = doctors.map((ele) => ele.firstName);
  const docLastName = doctors.map((ele) => ele.lastName);
  const docName = docLastName.map(
    (ele, ind) => "Dr. " + ele + " " + docFirstName[ind]
  );

  // to get doctor's time
  // const doctorTime = doctors.map((ele) => ele.doctorTime);
  // console.log("doctorTime: ", doctorTime);
  // const slot = doctorTime.forEach((slot) => console.log("slot: ", slot));

  const tomorrow = DateTime.now()
    .plus({ days: 1 })
    .setLocale("zh")
    .toLocaleString();

  const [docFullName, setDocFullName] = useState(docName[0]);
  const [apptDate, setApptDate] = useState(tomorrow);

  // console.log("appointmentDate: ", appointmentDate);

  const handleDateChange = (newApptDate) => {
    setApptDate({ ...apptDate, bookingDate: newApptDate });
  };

  // form validation rules
  const validationSchema = yup.object().shape({
    symptoms: yup
      .string()
      .min(3, "Mininum 3 characters")
      .required("Please indicate your symptoms"),
  });

  //actual input names
  const defaultValues = {
    // firstName: "",
    // lastName: "",
    // bookingDate: new Date(currentDate.getTime() + 86400000),
    appointmentTime: "",
    symptoms: "",
  };
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(validationSchema), defaultValues });

  const onSubmit = async (data) => {
    console.log("In reg form:", data);
    props.data(data);
  };

  const handleCancel = (e) => {
    navigate("/");
  };

  // const docNameOptions = () => {
  //   return docName.map((doc) => {
  //     return (
  //       <option value={doc} key={doc}>
  //         {doc}
  //       </option>
  //     );
  //   });
  // };

  return (
    <div className="apptForm">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Box mb={3}>
            <select
              value={docFullName}
              onChange={(e) => setDocFullName(e.target.value)}
            >
              {docName.map((name) => (
                <option value={name} key={name}>
                  {name}
                </option>
              ))}
            </select>
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
            <Controller
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
            />
          </Box>
          <Box mb={3}>
            <Controller
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
            />
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
