import React, { useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { TextField, Button, Box } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import "./LoginForm.css";

const LoginForm = (props) => {
  // form validation rules
  const validationSchema = yup.object().shape({
    email: yup.string().email("Valid email is required").required(),
    password: yup.string().min(4, "Mininum 4 characters").required(),
  });
  const [passwordShow, setPasswordShow] = useState(false);

  //actual input names
  const defaultValues = {
    email: "",
    password: "",
  };
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(validationSchema), defaultValues });

  const onSubmit = async (data) => {
    // console.log("From loginform:", data);
    props.data(data);
  };

  return (
    <div className="loginForm">
      <div>
        <h1 className="text-center pb-3 m-0 mb-3 loginFormHeader">Login</h1>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box mb={3}>
          <Controller
            name="email" //actual input
            control={control} //take place of the register RHF
            render={({
              //takes a function and rturn a react element
              field, //this error will be displyed takes over form state errors
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
              //takes a function and rturn a react element
              field, //this error will be displyed takes over form state errors
            }) => (
              <TextField
                label={"Password:"} //label in the box
                variant="outlined"
                fullWidth
                autoComplete="password"
                autoFocus
                placeholder="password"
                type={passwordShow ? "text" : "password"}
                // error={!!error} //convert obj into a bool
                // helperText={error ? error.message : null}
                error={errors.password ? true : false}
                helperText={errors.password?.message}
                {...field}
              />
            )}
          />
        </Box>
        <p style={{ fontSize: "110%" }}>
          I do not have an{" "}
          <Link to="/register" style={{ color: "#0cb4ea" }}>
            account.
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
            fontSize: "110%",
          }}
        >
          Login
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;
