import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { TextField, Button, Box } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import "./ApptForm.css";
import "bootstrap";

const ApptForm = (props) => {
  const navigate = useNavigate();
  console.log("ApptForm props data: ", props.data);
  // const params = useParams();

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [noOfGuests, setNoOfGuests] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  // const [unavailableDates, setUnavailableDates] = useState[[]]
  const [formData, setFormData] = useState({
    checkin_date: "",
    checkout_date: "",
    total_guests: "",
    total_price: "",
  });

  // an variable obj to store the checkin date and checkout date
  const selectionRange = {
    startDate: startDate,
    endDate: endDate,
    key: "selection",
  };

  console.log("selectionRange: ", selectionRange);

  // to update the start and end date state upon selecting the dates
  const handleSelect = (ranges) => {
    setStartDate(ranges.selection.startDate);
    setEndDate(ranges.selection.endDate);

    // getting the startDate and endDate and push into array
    // const datesBetween = require("dates-between");
    // const dates = Array.from(
    //   datesBetween(ranges.selection.startDate, ranges.selection.endDate)
    // );

    // getting number of nights between startDate and endDate
    // const noOfNights = dates.length - 1;

    // calculation of total price based on no. of nights
    const pricePerNight =
      //props.data.price["$numberDecimal"].toLocaleString();
      checkPriceType(); //sandra

    // const totalPrice = new Intl.NumberFormat("en-US", {
    //     style: "currency",
    //     currency: "USD",
    //     maximumFractionDigits: 2,
    // }).format(noOfNights * pricePerNight);

    // setTotalPrice(noOfNights * Number(pricePerNight));
  };

  // set no of guests state upon selecting the no of guests
  const handleGuests = (e) => {
    setNoOfGuests(e.target.value);
  };

  //sandra
  const headerOptions = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("user_token")}`,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("submit token---->", localStorage.getItem("user_token")); //sandra
    // console.log("handleSubmit: ", handleSubmit);

    try {
      const res = await axios.post(
        "http://localhost:8000/api/v1/user/bookings",
        {
          checkin_date: startDate,
          checkout_date: endDate,
          total_guests: noOfGuests,
          total_price: totalPrice,
        }
      );
      // console.log("res: ", res);
      toast.success("Successfully booked!", {
        position: toast.POSITION.TOP_CENTER,
      });
      navigate("/my/appointments");
    } catch (error) {
      // console.log(error.response);
      // console.log(error.response.data.message);
      toast.error(error.message, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  //sandra
  const checkPriceType = () => {
    return props.data.price.$numberDecimal
      ? props.data.price["$numberDecimal"].toLocaleString()
      : props.data.price.toLocaleString();
  };

  const handleCancel = (e) => {
    navigate("/doctors");
  };

  return (
    <form onSubmit={handleSubmit} className="bookingForm">
      {/* <div>
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
      </div> */}
    </form>
  );
};

export default ApptForm;
