import axios from "axios";
import React, { useState, useEffect } from "react";
import "./ShowBookings.css";
import { Box, Card, CardContent, CardMedia } from "@mui/material";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);

  const headerOptions = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("user_token")}`,
  };

  useEffect(() => {
    const fetchApi = async () => {
      const res = await axios.get(
        "http://localhost:8000/api/v1/user/bookings",
        {
          headers: headerOptions,
        }
      );
      const data = await res.data;
      console.log("data: ", data);
      setBookings(data);
    };
    fetchApi();
  }, []);

  return (
    <div className="myBookings">
      <h1 className="text-center mt-3 mb-5 showBookingHeader">MY BOOKINGS</h1>
      <div className="bookingCards">
        <Card
          sx={{ display: "flex" }}
          style={{
            border: "1px solid #979797",
            width: "40em",
            justifyContent: "center",
            marginBottom: "2em",
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <CardContent sx={{ flex: "1 0 auto" }}>Live From Space</CardContent>
            <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}>
              <div>Hello</div>
            </Box>
          </Box>
          <CardMedia
            component="img"
            sx={{ width: 151 }}
            image="/static/images/cards/live-from-space.jpg"
            alt="Live from space album cover"
          />
        </Card>
      </div>
    </div>
  );
};

export default MyBookings;
