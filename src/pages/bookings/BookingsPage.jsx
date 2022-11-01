import React, { useState, useEffect } from "react";
import axios from "axios";
import BookingCard from "../../components/bookings/bookingCard/BookingCard";
import "./BookingsPage.css";

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

  // console.log("bookings: ", bookings);

  const allBookings = bookings.bookings;

  const bookingCards = allBookings.map((booking) => (
    <BookingCard key={booking.id} data={booking} />
  ));

  return (
    <div>
      <h1 className="text-center mt-3 mb-4 showBookingHeader">My Bookings</h1>
      {bookingCards}
    </div>
  );
};

export default BookingsPage;
