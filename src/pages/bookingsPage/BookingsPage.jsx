import React, { useState, useEffect } from "react";
import axios from "axios";
import BookingCard from "../bookings/bookingCard/BookingCard";

const BookingsPage = () => {
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
      // console.log("data: ", data);
      setBookings(data);
    };
    fetchApi();
  }, []);

  return (
    <div>
      <BookingCard key={bookings.id} data={bookings} />
    </div>
  );
};

export default BookingsPage;
