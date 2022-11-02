import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { TextField, Button, Box } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { AdapterLuxon } from "@mui/x-date-pickers/AdapterLuxon";
import dayjs from "dayjs";
import { DateTime } from "luxon";
import "./ApptForm.css";
import "bootstrap";

const ApptForm = (props) => {
  const navigate = useNavigate();

  // console.log("ApptForm props data: ", props.data);

  const doctors = props.info;
  console.log("doctors: ", doctors);
  const docFirstName = doctors.map((ele) => ele.firstName);
  console.log("docFirstName: ", docFirstName);
  const docLastName = doctors.map((ele) => ele.lastName);
  console.log("docLastName: ", docLastName);
  const docName = docLastName.map((ele, ind) => ele + " " + docFirstName[ind]);
  console.log("docName: ", docName);
  const doctorTime = doctors.map((ele) => ele.doctorTime);
  console.log("doctorTime: ", doctorTime);
  const slot = doctorTime.forEach((slot) => console.log("slot: ", slot));
  // console.log("slot: ", slot);

  const currentDate = DateTime.now().setLocale("zh").toLocaleString();
  const tomorrow = DateTime.now()
    .plus({ days: 1 })
    .setLocale("zh")
    .toLocaleString();
  console.log("currentDate: ", currentDate);
  console.log("tomorrow: ", tomorrow);
  // const a = dayjs();
  // console.log("a: ", a);
  // const currentDate = dayjs().add(1, "day");
  // console.log("b: ", currentDate);
  const [selected, setSelected] = useState(docName[0]);
  const [appointmentDate, setAppointmentDate] = useState(tomorrow);

  console.log("appointmentDate: ", appointmentDate);
  // console.log("appointmentDate: ", appointmentDate.format("YYYY//DD"));

  const handleDateChange = (newAppointmentDate) => {
    setAppointmentDate(newAppointmentDate);
  };

  // console.log("doctors: ", doctors);

  // form validation rules
  const validationSchema = yup.object().shape({
    // firstName: yup.string().min(1, "Mininum 1 character").required(),
    // lastName: yup.string().min(2, "Mininum 2 characters").required(),
    // appointmentDate: yup
    //   .date()
    //   .default(() => new Date(currentDate.getTime() + 86400000)),
    symptoms: yup
      .string()
      .min(3, "Mininum 3 characters")
      .required("Please indicate your symptoms"),
  });

  //actual input names
  const defaultValues = {
    firstName: "",
    lastName: "",
    // appointmentDate: new Date(currentDate.getTime() + 86400000),
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
          <select
            value={selected}
            onChange={(e) => setSelected(e.target.value)}
          >
            {docName.map((name) => (
              <option value={name} key={name}>
                {name}
              </option>
            ))}
          </select>
          <LocalizationProvider dateAdapter={AdapterLuxon}>
            <DesktopDatePicker
              name="bookingDate"
              label="Select your Appointment Date:"
              inputFormat="yyyy/MM/dd"
              minDate={appointmentDate}
              onChange={handleDateChange}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
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
          {/* <Box mb={3}>
            <Controller
              name="firstName" //actual input
              control={control} //take place of the register RHF
              render={({
                //takes a function and return a react element
                field, //this error will be displyed in formstate errors
              }) => (
                <TextField
                  // onChange={onChange} // send value to hook form
                  // value={value}
                  label={"Doctor's Name:"} //label in the box
                  variant="outlined"
                  fullWidth
                  autoComplete="firstName"
                  autoFocus
                  // error={!!error} //convert obj into a bool
                  // helperText={error ? error.message : null}
                  error={errors.firstName ? true : false}
                  helperText={errors.firstName?.message}
                  {...field}
                />
              )}
            />
          </Box> */}
          {/* <Box mb={3}>
            <Controller
              control={control}
              name={doc}
              render={({ field: { onChange, value } }) => (
                <select onChange={onChange} value={value}>
                  {docNameOptions()}
                </select>
              )}
            />
          </Box> */}
          {/* <Box mb={3}>
            <Controller
              name="lastName" //actual input
              control={control} //take place of the register RHF
              render={({
                field, //this error will be displyed in formstate errors
              }) => (
                <TextField
                  label={"Last Name:"} //label in the box
                  variant="outlined"
                  fullWidth
                  autoComplete="lastName"
                  autoFocus
                  // error={!!error} //convert obj into a bool
                  // helperText={error ? error.message : null}
                  error={errors.lastName ? true : false}
                  helperText={errors.lastName?.message}
                  {...field}
                />
              )}
            />
          </Box> */}

          {/* <Box mb={3}>
            <Controller
              name="bookingDate" //actual input
              control={control} //take place of the register RHF
              render={({
                field, //this error will be displyed in formstate errors
              }) => (
                <TextField
                  label={"Select your appointment Date"} //label in the box
                  variant="outlined"
                  fullWidth
                  autoComplete="bookingDate"
                  autoFocus
                  // error={!!error} //convert obj into a bool
                  // helperText={error ? error.message : null}
                  error={errors.bookingDate ? true : false}
                  helperText={errors.bookingDate?.message}
                  {...field}
                />
              )}
            />
          </Box> */}

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
