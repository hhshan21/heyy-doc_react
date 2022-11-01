import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, MenuItem, Box, TextField } from "@mui/material";
import { toast } from "react-toastify";
import { useForm, Controller } from "react-hook-form";
import "./EditProfile.css";
require("dotenv-webpack").config();

const EditProfile = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);

  const {
    reset,
    control,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      drugAllergies: "",
    },
  });

  const headerOptions = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("user_token")}`,
  };

  // "http://localhost:8000/api/v1/user/profile",
  useEffect(() => {
    const fetchApi = async () => {
      const res = await axios.get(
        `https://heyy-doc-backend.herokuapp.com/api/v1/user/profile`,

        { headers: headerOptions }
      );

      const data = await res.data;
      // console.log("data: ", data);
      setProfile(data);
      reset({
        firstName: data.firstName,
        lastName: data.lastName,
        drugAllergies: data.drugAllergies,
      });
    };
    fetchApi();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();

    // "http://localhost:8000/api/v1/user/profile",
    try {
      const res = await axios.patch(
        `https://heyy-doc-backend.herokuapp.com/api/v1/user/profile`,

        {
          firstName: getValues().firstName,
          lastName: getValues().lastName,
          drugAllergies: getValues().drugAllergies,
        },
        { headers: headerOptions }
      );

      console.log("res: ", res);

      toast.success("Profile updated!", {
        position: toast.POSITION.TOP_CENTER,
      });
      navigate("/my/profile");
    } catch (err) {
      console.log("err: ", err);
      toast.error(err.message, { position: toast.POSITION.TOP_CENTER });
    }
  };

  const handleCancel = (e) => {
    navigate("/my/profile");
  };

  return (
    <div className="editProfileForm">
      <div>
        <h1 className="text-center pb-3 m-0 mb-3 mt-3 editProfileFormHeader">
          Edit My Profile
        </h1>
      </div>
      <form onSubmit={onSubmit} className="mb-5">
        <div>
          <Box mb={3}>
            <Controller
              name="firstName"
              control={control}
              rules={{
                required: {
                  value: true,
                  message: "Name is required",
                },
                pattern: {
                  value: /^[A-Za-z]+$/i,
                  message: "Alphabetical characters only",
                },
              }}
              render={({ field }) => (
                <TextField
                  label={"First Name:"}
                  variant="outlined"
                  fullWidth
                  error={errors.firstName ? true : false}
                  {...field}
                  helperText={errors.name && <p>{errors.firstName.message}</p>}
                />
              )}
            />
          </Box>
          <Box mb={3}>
            <Controller
              name="lastName"
              control={control}
              rules={{
                required: {
                  value: true,
                  message: "Name is required",
                },
                pattern: {
                  value: /^[A-Za-z]+$/i,
                  message: "Alphabetical characters only",
                },
              }}
              render={({ field }) => (
                <TextField
                  className={"mb-2"}
                  label={"Last Name:"}
                  variant="outlined"
                  fullWidth
                  error={errors.lastName ? true : false}
                  {...field}
                  helperText={errors.name && <p>{errors.lastname.message}</p>}
                />
              )}
            />
          </Box>
          <Box mb={3}>
            <Controller
              name="drugAllergies"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  // name={"about_me"}
                  label={"Drug Allergies:"}
                  fullWidth
                  variant="outlined"
                />
              )}
            />
          </Box>
          <p style={{ fontSize: "110%" }}>
            If you wish to change your email, please email us at
            emailrequest@heyydoc.com
          </p>
          <div className="editBtn">
            <Button
              onClick={handleCancel}
              variant="contained"
              style={{
                backgroundColor: "#979797",
                fontFamily: "Lexend Deca",
                fontWeight: "900",
                fontSize: "110%",
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
                fontSize: "110%",
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

export default EditProfile;
