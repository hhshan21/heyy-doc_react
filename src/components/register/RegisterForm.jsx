import React, { useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { TextField, Button, Box } from "@mui/material";
import "bootstrap";
import { Controller, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import "./RegisterForm.css";

const RegisterForm = (props) => {
  // form validation rules
  const validationSchema = yup.object().shape({
    firstName: yup.string().min(1, "Mininum 1 character").required(),
    lastName: yup.string().min(2, "Mininum 2 characters").required(),
    email: yup.string().email("Valid email is required").required(),
    password: yup
      .string()
      .required("Password is required")
      .min(4, "Mininum 4 characters"),
    confirmpassword: yup
      .string()
      .required("Confirm Password is required")
      .oneOf([yup.ref("password")], "Passwords must match"),
  });

  const [passwordShow, setPasswordShow] = useState(false);

  const [confirmpasswordShow, setConfirmPasswordShow] = useState(false);

  //actual input names
  const defaultValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmpassword: "",
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

  return (
    <div className="regForm">
      <div>
        <h1 className="text-center pb-3 m-0 mb-3 regFormHeader">
          Create an Account
        </h1>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Box mb={3}>
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
                  label={"First Name:"} //label in the box
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
          </Box>
          <Box mb={3}>
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
              name="password" //actual input
              control={control} //take place of the register RHF
              render={({
                field, //this error will be displyed in formstate errors
              }) => (
                <TextField
                  label={"Password:"} //label in the box
                  variant="outlined"
                  fullWidth
                  autoComplete="password"
                  autoFocus
                  // error={!!error} //convert obj into a bool
                  // helperText={error ? error.message : null}
                  error={errors.password ? true : false}
                  helperText={errors.password?.message}
                  type={passwordShow ? "text" : "password"}
                  {...field}
                />
              )}
            />
          </Box>
          <Box mb={3}>
            <Controller
              name="confirmpassword" //actual input
              control={control} //take place of the register RHF
              render={({ field }) => (
                <TextField
                  label={"Confirm Password:"} //label in the box
                  variant="outlined"
                  fullWidth
                  autoComplete="confirmpassword"
                  autoFocus
                  // error={!!error} //convert obj into a bool
                  // helperText={error ? error.message : null}
                  error={errors.confirmpassword ? true : false}
                  helperText={errors.confirmpassword?.message}
                  type={confirmpasswordShow ? "text" : "confirmpassword"}
                  {...field}
                />
              )}
            />
          </Box>
          <Box mb={3}>
            <Controller
              name="drugAllergies" //actual input
              control={control} //take place of the register RHF
              render={({ field }) => (
                <TextField
                  label={"Drug allergies:"} //label in the box
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
                />
              )}
            />
          </Box>
          <p>
            Already have an account?{" "}
            <Link to="/login" style={{ color: "#0cb4ea" }}>
              Login here.
            </Link>
          </p>

          <Button
            type="submit"
            variant="contained"
            style={{
              backgroundColor: "#0cb4ea",
              fontFamily: "Lexend Deca",
              fontWeight: "900",
              width: "50%",
              marginLeft: "25%",
            }}
          >
            CREATE ACCOUNT
          </Button>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
