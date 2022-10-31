import React, { useState, useEffect } from "react";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);

  const headerOptions = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("user_token")}`,
  };

  useEffect(() => {
    const fetchApi = async () => {
      const res = await fetch("http://localhost:8000/api/v1/user/bookings", {
        headers: headerOptions,
      });
      const data = await res.json();
      console.log("data: ", data);
      setBookings(data);
    };
    fetchApi();
  }, []);

  return <div>MyBookings</div>;
};

export default MyBookings;
