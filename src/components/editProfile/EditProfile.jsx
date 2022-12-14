import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, Box, TextField, FormHelperText } from "@mui/material";
import { toast } from "react-toastify";
import { useForm, Controller } from "react-hook-form";
import "./EditProfile.css";

// const BASE_API_URL = "http://localhost:8000";
const BASE_API_URL = window.BASE_API_URL;

const EditProfile = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);

  // initial state of form capture by react-hook form
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
      imageUrl: "",
    },
  });

  const headerOptions = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("user_token")}`,
  };

  // https://heyy-doc-backend.herokuapp.com/api/v1/user/profile
  // "http://localhost:8000/api/v1/user/profile",
  useEffect(() => {
    const fetchApi = async () => {
      const res = await axios.get(
        `${BASE_API_URL}/api/v1/user/profile`,

        { headers: headerOptions }
      );

      const data = await res.data;
      // console.log("data: ", data);
      setProfile(data);
      reset({
        firstName: data.firstName,
        lastName: data.lastName,
        drugAllergies: data.drugAllergies,
        imageUrl: data.imageUrl,
      });
    };
    fetchApi();
    toast.promise(fetchApi, {
      pending: "Please wait for your info!",
      success: "Your info is here!",
    });
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();

    //https://heyy-doc-backend.herokuapp.com/api/v1/user/profile
    // "http://localhost:8000/api/v1/user/profile",
    try {
      const res = await axios.patch(
        `${BASE_API_URL}/api/v1/user/profile`,
        {
          firstName: getValues().firstName,
          lastName: getValues().lastName,
          drugAllergies: getValues().drugAllergies,
          imageUrl: getValues().imageUrl,
        },
        { headers: headerOptions }
      );

      // console.log("res: ", res);

      toast.success("Profile updated!", {
        position: toast.POSITION.TOP_CENTER,
      });
      navigate("/my/profile");
    } catch (err) {
      // console.log("err: ", err);
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
          <Box mb={3}>
            <Controller
              name="imageUrl"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  // name={"about_me"}
                  label={"Image Url:"}
                  fullWidth
                  variant="outlined"
                />
              )}
            />
            <FormHelperText>Please input URL only</FormHelperText>
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
