import { useNavigate, useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import ApptForm from "../../components/appointments/apptForm/ApptForm";
import "./MakeAnApptPage.css";

const MakeAnApptPage = () => {
  const [catchError, setCatchError] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState([]);

  const headerOptions = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("user_token")}`,
  };

  useEffect(() => {
    const fetchApi = async () => {
      const res = await axios.get("http://localhost:8000/api/v1/doctors", {
        headers: headerOptions,
      });
      const data = await res.data;
      // console.log("data: ", data);
      setDoctors(data);
    };
    fetchApi();
  }, []);

  // console.log("doctors: ", doctors);

  // const onSubmit = async (data) => {
  //   console.log("From reg form compononent in reg pg:", data);
  //   setCatchError(null);

  //   try {
  //     const res = await axios.post(
  //       "http://localhost:8000/api/v1/user/bookings",
  //       data
  //     );
  //     console.log("Server Respond:", res);

  //     toast.success("Successfully booked!", {
  //       position: toast.POSITION.TOP_CENTER,
  //     });
  //     if (res.status === 200 || res.status === 201) {
  //       //navigate to home
  //       // if (location.pathname === "/register") {
  //       //   navigate("/login");
  //       // }
  //       navigate("/login");
  //     }
  //   } catch (error) {
  //     // console.log("error: ", error);
  //     // display an error
  //     // console.log("error.response.data: ", error.response.data);
  //     toast.error(error.response.data);
  //     setCatchError(error.response.data.error);
  //   }
  // };

  return (
    <div>
      <div className="createBooking">
        <h1 className="text-center pb-3 mb-3 createBookingHeader">
          Book a Doc
        </h1>
        <div className="p-3 mb-2">
          {catchError && (
            <div>
              <p
                style={{
                  color: "red",
                  textAlign: "center",
                  marginBottom: "1em",
                }}
              >
                {catchError}
              </p>
            </div>
          )}
          <ApptForm data={doctors} />
        </div>
      </div>
    </div>
  );
};

export default MakeAnApptPage;