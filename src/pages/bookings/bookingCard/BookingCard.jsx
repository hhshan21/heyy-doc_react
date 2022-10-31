import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./BookingCard.css";
import { Box, Card, CardContent, CardMedia } from "@mui/material";

const BookingCard = (props) => {
  const navigate = useNavigate();
  console.log("hi from BookingCard props: ", props);
  // const { id, firstName, lastName, imageUrl, doctorInfo } = props.data;

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

export default BookingCard;
